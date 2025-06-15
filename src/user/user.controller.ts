import { Body, Controller, Param, Post } from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// @Post('create')
	// async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
	// 	return this.userService.createUser(createUserDto);
	// }

	@Post('update/:id')
	async updateUser(
		@Body() updateUserDto: UpdateUserDto,
		@Param('id') id: string
	): Promise<User> {
		return this.userService.updateUser(updateUserDto, id);
	}
}
