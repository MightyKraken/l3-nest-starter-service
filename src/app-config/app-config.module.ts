import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppConfigService } from './app-config.service';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				PORT: Joi.number().default(3000),
				DB_CONNECTION_URL: Joi.string().required(),
				DATABASE_NAME: Joi.string().default('Nestjs'),
				JWT_SECRET_TOKEN: Joi.string().required().min(100),
				HASH_SALT_ROUNDS: Joi.number().default(10),
				JWT_TOKEN_EXPIRATION: Joi.string().default('3600s')
			})
		})
	],
	providers: [AppConfigService],
	exports: [AppConfigService]
})
export class AppConfigModule {}
