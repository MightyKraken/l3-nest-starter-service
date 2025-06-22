import { Body, Controller, Post } from '@nestjs/common';

import { User } from '../user';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/singup.dto';
import { TokenResponseDto } from './dtos/token-response.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
		return this.authService.login(loginDto);
	}

	@Post('signUp')
	async signUp(@Body() signupDto: SignupDto): Promise<User | never> {
		return this.authService.signUp(signupDto);
	}

	@Post('logout')
	logout(): void {
		throw new Error('Method not implemented.');
	}

	@Post('reset-password')
	resetPassword(): void {
		throw new Error('Method not implemented.');
	}

	@Post('forgot-password')
	forgotPassword(): void {
		throw new Error('Method not implemented.');
	}

	@Post('refresh')
	async refresh(
		@Body('refresh_token') refreshToken: string
	): Promise<TokenResponseDto> {
		return this.authService.refresh(refreshToken);
	}
}
