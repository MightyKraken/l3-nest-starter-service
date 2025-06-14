import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { TokenResponseDto } from './dtos/token-response.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
		return this.authService.login(loginDto);
	}

	@Post('signUp')
	signUp(): void {
		throw new Error('Method not implemented.');
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
}
