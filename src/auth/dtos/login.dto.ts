import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
	@IsString()
	username: string;

	@IsString()
	@IsOptional()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
