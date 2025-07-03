import { Injectable } from '@nestjs/common';

import { User } from '../../../user';
import { Auth } from '../../abstract/auth';
import { LoginDto } from '../../dtos/login.dto';
import { SignupDto } from '../../dtos/singup.dto';
import { TokenResponseDto } from '../../dtos/token-response.dto';

@Injectable()
export class AuthPassportService implements Auth {
	async login(loginDto: LoginDto): Promise<TokenResponseDto> {
		throw new Error('Method not implemented.');
	}
	async signUp(signUpDto: SignupDto): Promise<User | never> {
		throw new Error('Method not implemented.');
	}
	async refreshToken(token: string): Promise<TokenResponseDto> {
		throw new Error('Method not implemented.');
	}
	async logout(userId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
