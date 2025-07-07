import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfigService } from '../../app-config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(appConfigService: AppConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: appConfigService.JWT_SECRET_TOKEN
		});
	}

	async validate(...args: Array<any>): Promise<any> {
		// Implement your validation logic here
		// For example, you might want to check the JWT payload and return the user object
		// if the token is valid.
		return true; // Placeholder, replace with actual validation logic
	}
}
