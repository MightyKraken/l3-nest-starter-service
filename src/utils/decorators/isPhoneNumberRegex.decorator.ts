import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions
} from 'class-validator';

import { PhoneNumberRegex } from '../constants/validation';

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'IsPhoneNumber',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const phoneNumberRegx = PhoneNumberRegex;
					return typeof value === 'string' && phoneNumberRegx.test(value);
				},
				defaultMessage(args: ValidationArguments) {
					return 'Not a valid phone number';
				}
			}
		});
	};
}
