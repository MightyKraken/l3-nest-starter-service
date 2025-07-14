import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { AppConfigService } from '../app-config';
import { User, UserService } from '../user';
import { UserDto } from '../user/dtos/user.dto';
import { SignupDto } from './dtos/signup.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: AppConfigService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(username: string, password: string): Promise<User | null> {
		const user = await this.userService.findByUserName(username);
		if (user && this.isPasswordMatch(user.password, password)) {
			return user;
		}
		return null;
	}

	async signUp(signUpDto: SignupDto): Promise<UserDto> {
		const pass = signUpDto.password;
		const salt = this.configService.HASH_SALT_ROUNDS;
		const hashedPassword = await bcrypt.hash(pass, salt);
		// Create a event to notify other services about the new user creation
		const result = await this.userService.createUser({
			...signUpDto,
			password: hashedPassword
		});
		return result;
	}

	async refreshToken(token: string): Promise<TokenResponseDto> {
		if (!(await this.isRefreshTokenValid(token))) {
			throw new ForbiddenException('Invalid refresh token');
		}

		const user = await this.userService.findByRefreshToken(token);
		if (!user) {
			throw new ForbiddenException('User not found');
		}

		return this.generateAndStoreTokens(user);
	}

	async logout(userId: string): Promise<void> {
		await this.userService.removeRefreshToken(userId);
	}

	async generateAndStoreTokens(user: User): Promise<TokenResponseDto> {
		const payload = this.createJwtPayload(user);
		const access_token = await this.jwtService.signAsync(payload);
		const refresh_token = await this.jwtService.signAsync(
			{ sub: payload.sub },
			{
				secret: this.configService.JWT_REFRESH_SECRET_TOKEN,
				expiresIn: this.configService.JWT_REFRESH_SECRET_TOKEN_EXPIRATION
			}
		);
		await this.userService.setRefreshToken(refresh_token, user._id);
		return { access_token, refresh_token };
	}

	setCookies(res: Response, tokens: TokenResponseDto): void {
		res.cookie('access_token', tokens.access_token, { httpOnly: true });
		res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
	}

	clearCookies(res: any): void {
		res.clearCookie('access_token');
		res.clearCookie('refresh_token');
	}

	private isPasswordMatch(
		hashedPassword: string,
		plainPassword: string
	): boolean {
		return bcrypt.compareSync(plainPassword, hashedPassword);
	}

	private createJwtPayload(user: User): JwtPayload {
		return {
			username: user.username,
			sub: user._id,
			id: user._id,
			email: user.email
		};
	}

	private async isRefreshTokenValid(token: string): Promise<boolean> {
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: this.configService.JWT_REFRESH_SECRET_TOKEN,
				ignoreExpiration: false
			});
			return !!payload;
		} catch (err) {
			return false;
		}
	}
}
