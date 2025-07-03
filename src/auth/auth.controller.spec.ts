import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { Auth } from './abstract/auth';
import { AuthController } from './auth.controller';

const mockAuthService: Auth = {
	login: jest.fn(),
	signUp: jest.fn(),
	logout: jest.fn(),
	refreshToken: jest.fn()
};
const mockJwtService = {};
class MockJwtAuthGuard {
	canActivate(): boolean {
		return true;
	}
}

describe('AuthController', () => {
	let controller: AuthController;
	let authService: Auth;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: Auth,
					useValue: authService
				},
				{
					provide: JwtService,
					useValue: mockJwtService
				}
			]
		})
			.overrideGuard(MockJwtAuthGuard)
			.useClass(MockJwtAuthGuard)
			.compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
