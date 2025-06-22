import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from '../app-config';
import { UserService } from '../user';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: {
						findByUserName: jest.fn(),
						createUser: jest.fn()
					}
				},
				{
					provide: JwtService,
					useValue: {
						signAsync: jest.fn()
					}
				},
				{
					provide: AppConfigService,
					useValue: {
						HASH_SALT_ROUNDS: jest.fn()
					}
				}
			]
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
