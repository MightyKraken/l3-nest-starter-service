// is-public.decorator.spec.ts
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY, IsPublic } from './isPublic.decorator';

describe('IsPublic Decorator', () => {
	it('should set metadata isPublic = true on the method', () => {
		// Create a dummy class with a method and apply the decorator
		class TestClass {
			@IsPublic()
			testMethod(): any {}
		}

		const reflector = new Reflector();

		const metadata = reflector.get(
			IS_PUBLIC_KEY,
			TestClass.prototype.testMethod
		);

		expect(metadata).toBe(true);
	});
});
