import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { MongoServerError } from 'mongodb';

import { MongoExceptionFilter } from './mongo-exception.filter';

describe('MongoExceptionFilter', () => {
	let filter: MongoExceptionFilter;
	let mockResponse: any;
	let mockHost: ArgumentsHost;

	beforeEach(() => {
		filter = new MongoExceptionFilter();
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};
		mockHost = {
			switchToHttp: () => ({
				getResponse: () => mockResponse
			})
		} as unknown as ArgumentsHost;
	});

	it('should handle duplicate key error (code 11000)', () => {
		const exception = {
			code: 11000,
			keyValue: { email: 'test@example.com' }
		} as unknown as MongoServerError;

		filter.catch(exception, mockHost);

		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
		expect(mockResponse.json).toHaveBeenCalledWith({
			statusCode: HttpStatus.CONFLICT,
			message:
				'email test@example.com is already registered try another value.',
			error: 'Duplicate Key Error'
		});
	});

	it('should handle duplicate key error (code 11000) if exception keyvalue is empty', () => {
		const exception = {
			code: 11000
		} as unknown as MongoServerError;

		filter.catch(exception, mockHost);

		expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
		expect(mockResponse.json).toHaveBeenCalledWith({
			statusCode: HttpStatus.CONFLICT,
			message: 'Duplicate key error, please try another value.',
			error: 'Duplicate Key Error'
		});
	});

	it('should handle other mongo errors with 500 status', () => {
		const exception = {
			code: 99999,
			message: 'Some other mongo error'
		} as unknown as MongoServerError;

		filter.catch(exception, mockHost);

		expect(mockResponse.status).toHaveBeenCalledWith(
			HttpStatus.INTERNAL_SERVER_ERROR
		);
		expect(mockResponse.json).toHaveBeenCalledWith({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'Internal server error',
			error: 'Duplicate Key Error'
		});
	});
});
