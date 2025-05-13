import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('controller')
export class ControllerController {
	@Get('getPrefix')
	getPrefix(): string {
		return 'This is returned on /controller/getPrefix';
	}

	@Get()
	getController(): string {
		return 'This is returned on /controller';
	}

	@Get('json')
	getJson(): object {
		return { property: 'value' };
	}

	@Get('error')
	@HttpCode(400)
	getError(): object {
		return { error: 'should return 400' };
	}

	@Get('error500')
	@HttpCode(500)
	getError500(): object {
		return { error: 'should return 500' };
	}
}
