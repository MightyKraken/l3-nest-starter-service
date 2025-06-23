import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule, AppConfigService } from '../app-config';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
	providers: [AuthService, JwtAuthGuard]
})
export class AuthModule {}
