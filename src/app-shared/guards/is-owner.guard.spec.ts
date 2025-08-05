// user-is-owner.guard.spec.ts
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

import { IsOwnerGuard } from './is-owner.guard';

describe('IsOwnerGuard', () => {
	let guard: IsOwnerGuard;

	beforeEach(() => {
		guard = new IsOwnerGuard({} as any);
	});

	const mockExecutionContext = (
		userIdFromToken: string,
		paramId: string
	): ExecutionContext =>
		({
			switchToHttp: () => ({
				getRequest: () => ({
					user: { sub: userIdFromToken },
					params: { id: paramId }
				})
			})
		}) as unknown as ExecutionContext;

	it('should allow access if user ID matches param ID', () => {
		const context = mockExecutionContext('123', '123');
		expect(guard.canActivate(context)).toBe(true);
	});

	it('should deny access if user ID does not match param ID', () => {
		const context = mockExecutionContext('123', '456');
		expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
	});

	it('should deny access if user or param ID is missing', () => {
		const contextMissingUser = {
			switchToHttp: () => ({
				getRequest: () => ({
					user: null as any,
					params: { id: '123' }
				})
			})
		} as unknown as ExecutionContext;

		expect(() => guard.canActivate(contextMissingUser)).toThrow(
			ForbiddenException
		);
	});
});
