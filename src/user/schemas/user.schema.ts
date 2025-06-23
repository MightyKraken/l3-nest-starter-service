import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BaseSchema, BaseSchemaOptions } from '../../database';
import {
	EmailRegex,
	Gender,
	MaximumAddressLength,
	MaximumNameLength,
	MaximumUsernameLength,
	MinimumAddressLength,
	MinimumNameLength,
	MinimumUsernameLength,
	PasswordRegex,
	PhoneNumberRegex
} from '../../utils';

@Schema({
	collection: 'Users',
	...BaseSchemaOptions
})
export class User extends BaseSchema {
	@Prop({
		required: true,
		minlength: MinimumUsernameLength,
		maxlength: MaximumUsernameLength,
		unique: true,
		trim: true
	})
	username: string;

	@Prop({
		minlength: MinimumNameLength,
		maxlength: MaximumNameLength,
		trim: true,
		default: null
	})
	name: string;

	@Prop({
		required: true,
		match: PasswordRegex,
		select: false
	})
	password: string;

	@Prop({
		required: true,
		unique: true,
		match: EmailRegex
	})
	email: string;

	@Prop({
		match: PhoneNumberRegex,
		unique: true,
		sparse: true,
		index: true
	})
	phoneNumber: string;

	@Prop({
		minlength: MinimumAddressLength,
		maxlength: MaximumAddressLength,
		trim: true,
		default: null
	})
	address: string;

	@Prop({
		default: false
	})
	isEmailVerfied: boolean;

	@Prop({
		type: Date,
		default: null
	})
	emailVerfiedAt: Date | null;

	@Prop({
		default: false
	})
	isPhoneNumberVerified: boolean;

	@Prop({
		type: Date,
		default: null
	})
	phoneNumberVerifiedAt: Date | null;

	@Prop({
		type: String,
		enum: Gender,
		default: null
	})
	gender: Gender;

	@Prop({
		type: Date,
		default: null
	})
	dateOfBirth: Date | null;

	@Prop({
		default: null
	})
	refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
