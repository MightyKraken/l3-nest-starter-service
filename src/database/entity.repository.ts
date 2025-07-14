import { NotFoundException } from '@nestjs/common';
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
	constructor(protected readonly model: Model<T>) {}

	async findOne(
		filter: FilterQuery<T>,
		projection?: Record<string, unknown>
	): Promise<T | null> {
		try {
			return this.model
				.findOne(filter, {
					...projection
				})
				.select('-__v')
				.exec();
		} catch (error) {
			throw new NotFoundException('Data Not Found');
		}
	}

	async find(
		filter: FilterQuery<T>,
		projection?: Record<string, unknown>
	): Promise<Array<T> | null> {
		return this.model
			.find(filter, {
				...projection
			})
			.select('-__v')
			.exec();
	}

	async create(entityData: unknown): Promise<T> {
		const entity = new this.model(entityData);

		return entity.save();
	}

	async findOneAndUpdate(
		filter: FilterQuery<T>,
		update: UpdateQuery<unknown>
	): Promise<T | null> {
		const result = await this.model.findOneAndUpdate(filter, update, {
			new: true,
			fields: { __v: 0 }
		});
		if (!result) {
			throw new NotFoundException('Document not found');
		}
		return result;
	}

	async deleteMany(filter: FilterQuery<T>): Promise<boolean> {
		const result = await this.model.deleteMany(filter);
		return result.deletedCount > 0;
	}
}
