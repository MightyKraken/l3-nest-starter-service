import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { tryCatchWrapper } from '../utils';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		if (!(await this.isEmailUnique(createUserDto.email))) {
			throw new HttpException('Email already exists', HttpStatus.FORBIDDEN);
		}

		if (!(await this.isUsernameUnique(createUserDto.username))) {
			throw new HttpException('Username already exists', HttpStatus.FORBIDDEN);
		}

		return tryCatchWrapper(async () => {
			const newUser = new this.userModel(createUserDto);

			return (await newUser.save()).toJSON({
				useProjection: true,
				schemaFieldsOnly: true
			});
		}, 'Failed to create User');
	}

	async updateUser(
		updateUserDto: Partial<UpdateUserDto>,
		id: string
	): Promise<User> {
		return tryCatchWrapper(async () => {
			const updatedUser = await this.userModel.findByIdAndUpdate(
				id,
				{ $set: updateUserDto },
				{ new: true }
			);

			if (!updatedUser) {
				throw new NotFoundException(`User with id ${id} not found`);
			}

			return updatedUser;
		}, 'Failed to Update User');
	}

	async isUsernameUnique(username: string): Promise<boolean> {
		const user = await this.userModel.findOne({ username });
		return user === null;
	}

	async isEmailUnique(email: string): Promise<boolean> {
		const user = await this.userModel.findOne({ email });
		return user === null;
	}
}
