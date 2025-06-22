import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AppConfigService } from '../app-config';
import { User, UserService } from '../user';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/singup.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
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
		const payload = { username: user.username, sub: user._id };
		const access_token = await this.jwtService.signAsync(payload);
		const refresh_token = await this.jwtService.signAsync(payload, {
			expiresIn: '7d'
		});
		await this.userService.setRefreshToken(refresh_token, user._id);
		return { access_token, refresh_token };
	}

	async refresh(refreshToken: string): Promise<TokenResponseDto> {
		const user = await this.userService.findByRefreshToken(refreshToken);
		if (!user) {
			throw new UnauthorizedException('Invalid refresh token');
		}
		const payload = { username: user.username, sub: user._id };
		const access_token = await this.jwtService.signAsync(payload);
		return { access_token, refresh_token: refreshToken };
	}

	async signUp(signUpDto: SignupDto): Promise<User | never> {
		const password = signUpDto.password;
		const salt = this.configService.HASH_SALT_ROUNDS;
		const hashedPassword = await bcrypt.hash(password, salt);

		return this.userService.createUser({
			...signUpDto,
			password: hashedPassword
		});
	}

	isPasswordMatch(hashedPassword: string, plainPassword: string): boolean {
		return bcrypt.compareSync(plainPassword, hashedPassword);
	}
}
