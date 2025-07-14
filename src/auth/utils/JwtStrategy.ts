import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AppConfigService } from '../../app-config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

const cookieExtractor = (req: any): string | null => {
	if (req && req.cookies && req.cookies['access_token']) {
		return req.cookies['access_token'];
	}
	return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(appConfigService: AppConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
				cookieExtractor
			]),
			ignoreExpiration: false,
			secretOrKey: appConfigService.JWT_SECRET_TOKEN
		});
	}

	async validate(payload: any): Promise<any> {
		return <JwtPayload>payload;
	}
}
