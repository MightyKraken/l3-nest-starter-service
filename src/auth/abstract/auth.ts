import { User } from '../../user';
import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/singup.dto';
import { TokenResponseDto } from '../dtos/token-response.dto';

export abstract class Auth {
	abstract login(loginDto: LoginDto): Promise<TokenResponseDto>;
	abstract signUp(signUpDto: SignupDto): Promise<User | never>;
	abstract refreshToken(token: string): Promise<TokenResponseDto>;
	abstract logout(userId: string): Promise<void>;
}
