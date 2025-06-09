import {
	IsDateString,
	IsEnum,
	IsOptional,
	IsPhoneNumber,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator';

import {
	Gender,
	IsPastDate,
	MaximumAddressLength,
	MaximumNameLength,
	MinimumAddressLength,
	MinimumNameLength
} from '../../utils';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@MinLength(MinimumNameLength)
	@MaxLength(MaximumNameLength)
	name: string;

	@IsOptional()
	@IsPhoneNumber()
	phoneNumber: string;

	@IsOptional()
	@MinLength(MinimumAddressLength)
	@MaxLength(MaximumAddressLength)
	address: string;

	@IsOptional()
	@IsEnum(Gender, {
		message: `gender must be one of the following ${Object.values(Gender).join(', ')}`
	})
	gender: Gender;

	@IsOptional()
	@IsDateString(
		{},
		{ message: 'dateOfBirth must be a valid date string in ISO format' }
	)
	@IsPastDate()
	dateOfBirth: string;
}
