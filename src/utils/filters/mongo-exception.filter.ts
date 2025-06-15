import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
	catch(exception: MongoServerError, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let message = 'Internal server error';
		let error = 'Internal server error';
		if (exception.code === 11000) {
			status = HttpStatus.CONFLICT;
			const [field, value] = Object.entries(exception.keyValue || {})[0] || [];
			if (!field || !value) {
				message = 'Duplicate key error, please try another value.';
			} else {
				message = `${field} ${value} is already registered try another value.`;
			}
			error = 'Duplicate key error';
		}

		if (exception.code === 31254) {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			message = exception.message;
			error = exception.errmsg;
		}

		response.status(status).json({
			statusCode: status,
			message,
			error
		});
	}
}
