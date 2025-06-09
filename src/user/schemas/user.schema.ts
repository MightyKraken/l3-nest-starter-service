import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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

export type UserDocument = HydratedDocument<User>;

@Schema({
	timestamps: true,
	collection: 'Users'
})
export class User {
	@Prop({ required: true, default: uuidv4 })
	_id: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
