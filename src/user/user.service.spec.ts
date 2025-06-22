import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;
	let userRepository: jest.Mocked<UserRepository>;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: {
						create: jest.fn(),
						findOneAndUpdate: jest.fn(),
						findOne: jest.fn()
					}
				}
			]
		}).compile();

		service = module.get<UserService>(UserService);
		userRepository = module.get(UserRepository);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createUser', () => {
		it('should create and return a new user', async () => {
			const createUserDto: CreateUserDto = {
				username: 'test',
				email: 'test@example.com',
				password: 'StrongPassword123!'
			};

			const createdUser = {
				toJSON: jest.fn().mockReturnValue(createUserDto)
			};
			userRepository.create.mockResolvedValue(createdUser as any);

			const result = await service.createUser(createUserDto);

			expect(userRepository.create).toHaveBeenCalledWith(createUserDto);
			expect(createdUser.toJSON).toHaveBeenCalled();
			expect(result).toEqual(createUserDto);
		});
	});
});
