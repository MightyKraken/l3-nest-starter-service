import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { User } from '../user';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignupDto } from './dtos/singup.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { AuthUser } from './guards/authUser.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService
	) {}
	@Post('login')
	async login(
		@Body() loginDto: LoginDto,
		@Res({ passthrough: true }) res: Response
	): Promise<TokenResponseDto> {
		const tokens = await this.authService.login(loginDto);
		res.cookie('access_token', tokens.access_token, { httpOnly: true });
		res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
		return tokens;
	}

	@Post('signUp')
	async signUp(@Body() signupDto: SignupDto): Promise<User | never> {
		return this.authService.signUp(signupDto);
	}

	@Post('logout')
	@UseGuards(JwtAuthGuard)
	async logout(
		@AuthUser() user: any,
		@Res({ passthrough: true }) res: Response
	): Promise<{ message: string }> {
		await this.authService.logout(user.sub);
		res.clearCookie('access_token');
		res.clearCookie('refresh_token');
		return { message: 'Logged out successfully' };
	}

	@Post('reset-password')
	resetPassword(): void {
		throw new Error('Method not implemented.');
	}

	@Post('forgot-password')
	forgotPassword(): void {
		throw new Error('Method not implemented.');
	}

	@Post('refresh-token')
	async refreshToken(
		@Body() refreshTokenDto: RefreshTokenDto,
		@Res({ passthrough: true }) res: Response
	): Promise<TokenResponseDto> {
		const tokens = await this.authService.refreshToken(
			refreshTokenDto.refreshToken
		);
		res.cookie('access_token', tokens.access_token, { httpOnly: true });
		res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
		return tokens;
	}
}
