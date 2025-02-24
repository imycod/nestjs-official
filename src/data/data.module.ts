import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [TenantModule],
  controllers: [DataController],
  providers: [],
})
export class DataModule {
  constructor() {
    console.log('DataModule constructor');
  }

  onModuleInit() {
    console.log('DataModule onModuleInit');
  }

  onModuleDestroy() {
    console.log('DataModule onModuleDestroy');
  }
}
