import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';

import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

const mockUserModel = (): any => ({
	create: jest.fn(),
	save: jest.fn(),
	findByIdAndUpdate: jest.fn(),
	findOne: jest.fn()
});

describe('UserService', () => {
	let service: UserService;
	let model: jest.Mocked<Model<UserDocument>>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getModelToken('User'),
					useValue: {
						save: jest.fn(),
						findByIdAndUpdate: jest.fn(),
						findOne: jest.fn()
					}
				}
			]
		}).compile();

		service = module.get<UserService>(UserService);
		model = module.get(getModelToken('User'));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createUser', () => {
		it('should create and return a new user', async () => {
			const createUserDto = {
				username: 'test',
				email: 'test@example.com'
			} as any;

			const savedUser = {
				toJSON: jest.fn().mockReturnValue(createUserDto)
			};

			// Mock constructor + save behavior
			const userModelConstructorMock = jest.fn().mockImplementation(() => ({
				save: jest.fn().mockResolvedValue(savedUser)
			}));

			// Replace userModel with mocked constructor
			(service as any).userModel = userModelConstructorMock;

			const result = await service.createUser(createUserDto);

			expect(userModelConstructorMock).toHaveBeenCalledWith(createUserDto);
			expect(savedUser.toJSON).toHaveBeenCalledWith({
				useProjection: true,
				schemaFieldsOnly: true
			});
			expect(result).toEqual(createUserDto);
		});
	});

	describe('updateUser', () => {
		it('should update and return a user', async () => {
			const updateUserDto = { name: 'new@example.com' };
			const userId = 'abc123';
			const updatedUser = { id: userId, ...updateUserDto };

			(model.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

			const result = await service.updateUser(updateUserDto, userId);

			expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
				userId,
				{ $set: updateUserDto },
				{ new: true }
			);
			expect(result).toEqual(updatedUser);
		});

		it('should throw NotFoundException if user not found', async () => {
			(model.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

			await expect(service.updateUser({}, 'invalid-id')).rejects.toThrow(
				NotFoundException
			);
		});
	});

	describe('isUsernameUnique', () => {
		it('should return true if username is unique', async () => {
			(model.findOne as jest.Mock).mockResolvedValue(null);

			const result = await service.isUsernameUnique('uniqueuser');

			expect(model.findOne).toHaveBeenCalledWith({ username: 'uniqueuser' });
			expect(result).toBe(true);
		});

		it('should return false if username exists', async () => {
			(model.findOne as jest.Mock).mockResolvedValue({ username: 'existing' });

			const result = await service.isUsernameUnique('existing');

			expect(model.findOne).toHaveBeenCalledWith({ username: 'existing' });
			expect(result).toBe(false);
		});
	});

	describe('isEmailUnique', () => {
		it('should return true if email is unique', async () => {
			(model.findOne as jest.Mock).mockResolvedValue(null);

			const result = await service.isEmailUnique('unique@example.com');

			expect(model.findOne).toHaveBeenCalledWith({
				email: 'unique@example.com'
			});
			expect(result).toBe(true);
		});

		it('should return false if email exists', async () => {
			(model.findOne as jest.Mock).mockResolvedValue({
				email: 'exists@example.com'
			});

			const result = await service.isEmailUnique('exists@example.com');

			expect(model.findOne).toHaveBeenCalledWith({
				email: 'exists@example.com'
			});
			expect(result).toBe(false);
		});
	});
});
