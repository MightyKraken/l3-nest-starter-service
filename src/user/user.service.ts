import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		return (await this.userRepository.create(createUserDto)).toJSON();
	}

	async updateUser(
		updateUserDto: Partial<UpdateUserDto>,
		id: string
	): Promise<User> {
		return await this.userRepository.findOneAndUpdate(
			{ _id: id },
			updateUserDto
		);
	}

	async findByUserName(username: string): Promise<User | null> {
		const user = await this.userRepository.findOne({ username: username });
		return user ? user.toJSON() : null;
	}

	async setRefreshToken(refreshToken: string, userId: string): Promise<User> {
		return await this.userRepository.findOneAndUpdate(
			{ _id: userId },
			{ refreshToken }
		);
	}

	async removeRefreshToken(userId: string): Promise<User> {
		return await this.userRepository.findOneAndUpdate(
			{ _id: userId },
			{ refreshToken: null }
		);
	}

	async findByRefreshToken(refreshToken: string): Promise<User | null> {
		return this.userRepository.findOne({ refreshToken });
	}

	async findById(id: string): Promise<User | null> {
		return this.userRepository.findOne({ _id: id });
	}
}
