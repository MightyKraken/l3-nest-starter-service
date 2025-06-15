import { Prop, Schema, SchemaOptions } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export const BaseSchemaOptions: SchemaOptions = {
	timestamps: true,
	toJSON: {
		versionKey: false,
		virtuals: false,
		useProjection: true,
		schemaFieldsOnly: true
	},
	toObject: {
		versionKey: false,
		virtuals: true,
		useProjection: true,
		schemaFieldsOnly: true
	}
};

@Schema(BaseSchemaOptions)
export class BaseSchema {
	@Prop({ required: true, default: uuidv4 })
	_id: string;
}
