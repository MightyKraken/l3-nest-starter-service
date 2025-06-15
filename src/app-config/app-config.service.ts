import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
	constructor(private configService: ConfigService) {}

	get PORT(): number {
		return this.configService.get<number>('PORT');
	}

	get DB_CONNECTION_URL(): string {
		return this.configService.get<string>('DB_CONNECTION_URL');
	}

	get DATABASE_NAME(): string {
		return this.configService.get<string>('DATABASE_NAME');
	}

	get JWT_SECRET_TOKEN(): string {
		return this.configService.get<string>('JWT_SECRET_TOKEN');
	}

	get JWT_TOKEN_EXPIRATION(): string {
		return this.configService.get<string>('JWT_TOKEN_EXPIRATION');
	}

	get HASH_SALT_ROUNDS(): number {
		return this.configService.get<number>('HASH_SALT_ROUNDS');
	}
}
