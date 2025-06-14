import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app-root/app.module';
import { MongoExceptionFilter } from './utils/filters/mongo-exception.filter';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalFilters(new MongoExceptionFilter());
	await app.listen(configService.get<number>('PORT') || 3000);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
