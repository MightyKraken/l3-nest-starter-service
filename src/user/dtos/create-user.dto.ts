import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator';

import {
	IsPasswordStrong,
	MaximumUsernameLength,
	MinimumUsernameLength
} from '../../utils';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(MinimumUsernameLength)
	@MaxLength(MaximumUsernameLength)
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsPasswordStrong()
	password: string;
}
