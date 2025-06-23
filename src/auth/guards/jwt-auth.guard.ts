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
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			throw new UnauthorizedException('No authorization header');
		}
		const token = authHeader.split(' ')[1];
		try {
			const decoded = await this.jwtService.verifyAsync(token);
			request['user'] = decoded as JwtPayload;
			return true;
		} catch {
			throw new UnauthorizedException('Invalid token');
		}
	}
}
