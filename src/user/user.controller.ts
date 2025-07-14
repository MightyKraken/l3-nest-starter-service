import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';

import { IsOwnerGuard } from '../app-shared';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(IsOwnerGuard)
	@Post('update/:id')
	async updateUser(
		@Body() updateUserDto: UpdateUserDto,
		@Param('id') id: string
	): Promise<UserDto> {
		return this.userService.updateUser(updateUserDto, id);
	}
}
