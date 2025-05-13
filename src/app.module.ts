import { Module } from '@nestjs/common';

import { ControllerController } from './controller/controller.controller';
import { ResourceModule } from './resource/resource.module';

@Module({
	imports: [ResourceModule],
	controllers: [ControllerController],
	providers: []
})
export class AppModule {}
