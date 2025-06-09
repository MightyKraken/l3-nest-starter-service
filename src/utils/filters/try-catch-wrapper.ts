import { InternalServerErrorException } from '@nestjs/common';

export async function tryCatchWrapper<T>(
	fn: () => Promise<T>,
	errorMessage = 'Operation Failed'
): Promise<T> {
	try {
		return await fn();
	} catch (error) {
		console.error(errorMessage, error);
		throw new InternalServerErrorException(errorMessage);
	}
}
