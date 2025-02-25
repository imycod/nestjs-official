import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantConnectionService } from './tenant-connection.service';
import { TenantIdService } from './tenant-id.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TenantService, TenantIdService, TenantConnectionService],
  exports: [TenantService, TenantConnectionService],
})
export class TenantModule {
  constructor() {
    console.log('TenantModule - constructor'); // 添加日志
  }

  onModuleInit() {
    console.log('TenantModule onModuleInit');
  }

  onModuleDestroy() {
    console.log('TenantModule onModuleDestroy');
  }
}
