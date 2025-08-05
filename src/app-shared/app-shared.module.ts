import { Global, Module } from '@nestjs/common';

import { IsOwnerGuard } from './guards/is-owner.guard';

@Global()
@Module({
	providers: [IsOwnerGuard],
	exports: [IsOwnerGuard]
})
export class AppSharedModule {}
