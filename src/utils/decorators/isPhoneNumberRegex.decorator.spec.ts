import { validate } from 'class-validator';

import { IsPhoneNumber } from './isPhoneNumberRegex.decorator';

class TestPhoneNumberDto {
	@IsPhoneNumber({ message: 'Invalid phone number' })
	phone: string;
}

class TestPhoneNumberDtoWithOutMessage {
	@IsPhoneNumber()
	phone: string;
}

describe('IsPhoneNumber', () => {
	it('should validate a correct phone number', async () => {
		const dto = new TestPhoneNumberDto();
		dto.phone = '+12345678901';

		const errors = await validate(dto);
		expect(errors.length).toBe(0);
	});

	it('should fail validation for an invalid phone number', async () => {
		const dto = new TestPhoneNumberDto();
		dto.phone = 'abc123';

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty(
			'IsPhoneNumber',
			'Invalid phone number'
		);
	});

	it('should fail validation for non-string values', async () => {
		const dto = new TestPhoneNumberDto();
		dto.phone = 1234567890 as any;

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty(
			'IsPhoneNumber',
			'Invalid phone number'
		);
	});

	it('should fail validation for non-string values and contain default message', async () => {
		const dto = new TestPhoneNumberDtoWithOutMessage();
		dto.phone = 1234567890 as any;

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty(
			'IsPhoneNumber',
			'Not a valid phone number'
		);
	});
});
