import {
	ForbiddenException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AppConfigService } from '../app-config';
import { User, UserService } from '../user';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/singup.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: AppConfigService,
		private readonly jwtService: JwtService
	) {}

	async login(loginDto: LoginDto): Promise<TokenResponseDto> {
		const { username, password } = loginDto;
		const user = await this.userService.findByUserName(username);

		if (!user || !this.isPasswordMatch(user.password, password)) {
			throw new UnauthorizedException('Credentials not valid');
		}
		return this.generateAndStoreTokens(user);
	}

	async signUp(signUpDto: SignupDto): Promise<User | never> {
		const password = signUpDto.password;
		const salt = this.configService.HASH_SALT_ROUNDS;
		const hashedPassword = await bcrypt.hash(password, salt);
		// Create a event to notify other services about the new user creation
		return this.userService.createUser({
			...signUpDto,
			password: hashedPassword
		});
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

	private async generateAndStoreTokens(user: User): Promise<TokenResponseDto> {
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
