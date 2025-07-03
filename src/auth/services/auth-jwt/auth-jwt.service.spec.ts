import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigService } from '../../../app-config';
import { UserService } from '../../../user';
import { AuthJwtService } from './auth-jwt.service';

describe('AuthJwtService', () => {
	let service: AuthJwtService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthJwtService,
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

		service = module.get<AuthJwtService>(AuthJwtService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
