import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import * as os from 'os';

import { IsPublic } from '../utils';
@Controller()
export class AppController {
	constructor() {}

	@IsPublic()
	@Get()
	getHello(@Req() request: Request): any {
		const networkInterfaces = os.networkInterfaces();
		const interfaces = [];

		for (const name of Object.keys(networkInterfaces)) {
			for (const net of networkInterfaces[name]!) {
				if (net.family === 'IPv4' && !net.internal) {
					interfaces.push({
						name,
						address: net.address
					});
				}
			}
		}
		return {
			hostname: os.hostname(),
			ipAddresses: interfaces,
			platform: os.platform(),
			uptime: os.uptime(),
			currentTime: new Date().toISOString(),
			requestIp: request.ip
		};
	}
}
