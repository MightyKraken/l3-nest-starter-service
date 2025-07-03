import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule, AppConfigService } from '../app-config';
import { UserModule } from '../user';
import { Auth } from './abstract/auth';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthPassportService } from './services/auth-passport/auth-passport.service';

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
	providers: [{ provide: Auth, useClass: AuthPassportService }, JwtAuthGuard]
})
export class AuthModule {}
