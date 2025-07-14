import { Expose } from 'class-transformer';

import { Gender } from '../../utils';

export class UserDto {
	@Expose()
	username: string;

	@Expose()
	name: string;

	@Expose()
	email: string;

	@Expose()
	phoneNumber: string;

	@Expose()
	address: string;

	@Expose()
	gender: Gender;

	@Expose()
	dateOfBirth: Date | null;
}
