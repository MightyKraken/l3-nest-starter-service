import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, MongooseError } from 'mongoose';

import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DB_CONNECTION_URL'),
				dbName: configService.get<string>('DATABASE_NAME'),
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
			inject: [ConfigService]
		}),
		UserModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
