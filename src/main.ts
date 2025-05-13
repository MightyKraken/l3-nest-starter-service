import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule);
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
	.then(() => {
		console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
	})
	.catch((err) => {
		console.error('Error starting application:', err);
	});
