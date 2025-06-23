import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const authHeader = request.headers['authorization'];
		let token: string | undefined;

		if (authHeader && /^Bearer /i.test(authHeader)) {
			token = authHeader.split(' ')[1];
		} else if (request.cookies && request.cookies['access_token']) {
			token = request.cookies['access_token'];
		}

		if (!token) {
			throw new UnauthorizedException('No token found');
		}

		try {
			const decoded = await this.jwtService.verifyAsync(token);
			request['user'] = decoded as JwtPayload;
			return true;
		} catch {
			throw new UnauthorizedException('Invalid token');
		}
	}
}
