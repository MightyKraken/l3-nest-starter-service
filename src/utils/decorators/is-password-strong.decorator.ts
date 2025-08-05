import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions
} from 'class-validator';

import { PasswordRegex, PasswordRegexMessage } from '../constants/validation';

export function IsPasswordStrong(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isPasswordStrong',
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					const passwordRegex = PasswordRegex;
					return typeof value === 'string' && passwordRegex.test(value);
				},
				defaultMessage(args: ValidationArguments) {
					return PasswordRegexMessage;
				}
			}
		});
	};
}
