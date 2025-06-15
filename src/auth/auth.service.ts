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
		private jwtService: JwtService
	) {}

	async login(loginDto: LoginDto): Promise<TokenResponseDto> {
		const { username, password } = loginDto;
		const user = await this.userService.findByUserName(username);

		if (!user || !this.isPasswordMatch(user.password, password)) {
			throw new UnauthorizedException('Credentials not valid');
		}
		const payload = { username: user.username, sub: user._id };
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
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
