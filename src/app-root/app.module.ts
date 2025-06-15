import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, MongooseError } from 'mongoose';

import { AppConfigModule, AppConfigService } from '../app-config';
import { AuthModule } from '../auth';
import { UserModule } from '../user';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		AppConfigModule,
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: async (configService: AppConfigService) => ({
				uri: configService.DB_CONNECTION_URL,
				dbName: configService.DATABASE_NAME,
				retryAttempts: 1,
				connectionErrorFactory: (error: MongooseError) => {
					return new MongooseError(`Failed to connect to MongoDB`);
				},
				onConnectionCreate: (connection: Connection) => {
					connection.on('connected', () => {
						console.log('MongoDB connection established successfully');
					});
				}
			}),
			inject: [AppConfigService]
		}),
		UserModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
