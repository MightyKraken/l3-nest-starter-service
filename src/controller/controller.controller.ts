import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParamData,
	Post,
	Req,
	Res
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateCatDto } from './create-cat.dto';

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

	@Get('response')
	getResponse(@Res() res: Response): object {
		const test = res.status(200).json({ a: 2 });
		return test;
	}

	@Get('request/:id')
	getRequest(@Req() req: Request, @Param('id') id: ParamData): object {
		const body: unknown = req.body;
		const params: any = req.params;
		const queryParam: any = req.query;
		const headers: any = req.headers;
		const ip: any = req.ip;
		const host: any = req.host;

		console.log('asdasd', ip);

		console.log(host);

		console.log(headers);

		console.log(id);

		console.log(body);
		console.log(queryParam);
		console.log(params);

		return { test: 'a' };
	}

	@Post()
	async create(@Body() createCatDto: CreateCatDto): Promise<string> {
		console.log(createCatDto);
		return await Promise.resolve('This action adds a new cat');
	}

	@Get('wildcard/*')
	wildCard(): string {
		return 'This route uses a wildcard';
	}
}
