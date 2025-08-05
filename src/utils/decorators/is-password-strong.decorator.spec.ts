import { validate } from 'class-validator';

import { IsPasswordStrong } from './is-password-strong.decorator';

class TestPasswordDto {
	@IsPasswordStrong()
	password: string;
}

describe('isPasswordStrong Decorator', () => {
	it('should validate a strong password', async () => {
		const dto = new TestPasswordDto();
		dto.password = 'StrongP@ss1';

		const errors = await validate(dto);
		expect(errors.length).toBe(0);
	});

	it('should fail if password is too short', async () => {
		const dto = new TestPasswordDto();
		dto.password = 'S@1';

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty('isPasswordStrong');
	});

	it('should fail if password lacks uppercase', async () => {
		const dto = new TestPasswordDto();
		dto.password = 'weakp@ss1';

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty('isPasswordStrong');
	});

	it('should fail if password lacks number', async () => {
		const dto = new TestPasswordDto();
		dto.password = 'WeakPass@';

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty('isPasswordStrong');
	});

	it('should fail if password lacks special character', async () => {
		const dto = new TestPasswordDto();
		dto.password = 'WeakPass1';

		const errors = await validate(dto);
		expect(errors.length).toBeGreaterThan(0);
		expect(errors[0].constraints).toHaveProperty('isPasswordStrong');
	});
});
