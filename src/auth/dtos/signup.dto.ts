import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength
} from 'class-validator';

import {
	IsPasswordStrong,
	MaximumUsernameLength,
	MinimumUsernameLength,
	UserNameRegex,
	UserNameRegexMessage
} from '../../utils';

export class SignupDto {
	@IsNotEmpty()
	@IsString()
	@MinLength(MinimumUsernameLength)
	@MaxLength(MaximumUsernameLength)
	@Matches(UserNameRegex, {
		message: UserNameRegexMessage
	})
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsPasswordStrong()
	password: string;
}
