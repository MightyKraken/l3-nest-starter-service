import { validate } from 'class-validator';

import { IsPastDate } from './isPastDate.decorator';

class TestPastDateDto {
	@IsPastDate({ message: 'Date must be in the past' })
	date: string;
}

class TestPastDateDtoDefault {
	@IsPastDate()
	date: string;
}

describe('IsPastDate', () => {
	it('should validate a past date successfully', async () => {
		const dto = new TestPastDateDto();
		dto.date = '2000-01-01';

		const errors = await validate(dto);
		expect(errors.length).toBe(0);
	});

	it('should fail validation for a future date', async () => {
		const dto = new TestPastDateDto();
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 1);
		dto.date = futureDate.toISOString();

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty(
			'isPastDate',
			'Date must be in the past'
		);
	});

	it('should fail validation for invalid date string', async () => {
		const dto = new TestPastDateDto();
		dto.date = 'invalid-date';

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty('isPastDate');
	});

	it('should fail validation for a future date and show default message', async () => {
		const dto = new TestPastDateDtoDefault();
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 1);
		dto.date = futureDate.toISOString();

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty(
			'isPastDate',
			'date must be a past date'
		);
	});
});
