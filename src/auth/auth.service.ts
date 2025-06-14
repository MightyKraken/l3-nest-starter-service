import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user';
import { LoginDto } from './dtos/login.dto';
import { TokenResponseDto } from './dtos/token-response.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService
	) {}

	async login(loginDto: LoginDto): Promise<TokenResponseDto> {
		const user = await this.userService.findByUserName(loginDto.username);

		if (!user || user.password !== loginDto.password) {
			throw new UnauthorizedException('Credentials not valid');
		}
		const payload = { username: user.username, sub: user._id };
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}
}
