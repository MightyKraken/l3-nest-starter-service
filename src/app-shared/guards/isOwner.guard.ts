import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsOwnerGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();

		const user = request.user;
		const paramUserId = request.params.id;

		if (!user || !paramUserId) {
			throw new ForbiddenException('Invalid request');
		}

		if (user.sub?.toString() !== paramUserId.toString()) {
			throw new ForbiddenException('You do not have permission');
		}

		return true;
	}
}
