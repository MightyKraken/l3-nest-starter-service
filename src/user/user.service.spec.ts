import { Test, TestingModule } from '@nestjs/testing';

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
});
