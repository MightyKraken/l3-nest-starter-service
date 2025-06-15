import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
	let controller: UserController;
	let service: UserService;

	const mockUserService = {
		createUser: jest.fn(),
		updateUser: jest.fn()
	};
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [{ provide: UserService, useValue: mockUserService }]
		}).compile();
		controller = module.get<UserController>(UserController);
		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('createUser', () => {
		it('should create a user', async () => {
			const createUserDto: CreateUserDto = {
				username: 'testuser',
				email: 'test@example.com'
			} as any;
			const createdUser: User = { ...createUserDto, _id: 'abc123' } as any;

			(service.createUser as jest.Mock).mockResolvedValue(createdUser);

			const result = await controller.createUser(createUserDto);

			expect(service.createUser).toHaveBeenCalledWith(createUserDto);
			expect(result).toEqual(createdUser);
		});
	});

	describe('updateUser', () => {
		it('should update a user', async () => {
			const updateUserDto: UpdateUserDto = {
				name: 'updated@example.com'
			} as any;
			const userId = 'abc123';
			const updatedUser: User = {
				_id: userId,
				username: 'testuser',
				email: 'updated@example.com'
			} as any;

			(service.updateUser as jest.Mock).mockResolvedValue(updatedUser);

			const result = await controller.updateUser(updateUserDto, userId);

			expect(service.updateUser).toHaveBeenCalledWith(updateUserDto, userId);
			expect(result).toEqual(updatedUser);
		});
	});
});
