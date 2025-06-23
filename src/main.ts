import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppConfigService } from './app-config';
import { AppModule } from './app-root/app.module';
import { MongoExceptionFilter } from './utils/filters/mongo-exception.filter';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(AppConfigService);

	app.use(cookieParser());
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new MongoExceptionFilter());
	await app.listen(configService.PORT);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
