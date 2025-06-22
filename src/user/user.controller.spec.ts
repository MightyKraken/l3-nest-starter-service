import { Test, TestingModule } from '@nestjs/testing';

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
