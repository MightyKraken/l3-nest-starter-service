import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule, AppConfigService } from '../app-config';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './utils/JwtStrategy';
import { LocalStrategy } from './utils/LocalStrategy';

@Module({
	imports: [
		UserModule,
		JwtModule.registerAsync({
			imports: [AppConfigModule],
			inject: [AppConfigService],
			global: true,
			useFactory: async (configService: AppConfigService) => ({
				secret: configService.JWT_SECRET_TOKEN,
				signOptions: { expiresIn: configService.JWT_TOKEN_EXPIRATION }
			})
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		JwtStrategy
	]
})
export class AuthModule {}
