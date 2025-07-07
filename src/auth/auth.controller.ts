import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { UserWithoutPassword } from '../user';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SignupDto } from './dtos/singup.dto';
import { TokenResponseDto } from './dtos/token-response.dto';
import { AuthUser } from './guards/authUser.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async loginPassport(
		@Req() req: any,
		@Res({ passthrough: true }) res: Response
	): Promise<TokenResponseDto> {
		const tokens = req.user;
		this.authService.setCookies(res, tokens);
		return tokens;
	}

	@Post('signUp')
	async signUp(
		@Body() signupDto: SignupDto
	): Promise<UserWithoutPassword | never> {
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
