import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { TenantConnectionFactory, tenantConnectionFactory } from 'src/tenant/tenant.connection.factory';
import { TenantService } from 'src/tenant/tenant.service';
import { REQUEST } from '@nestjs/core';
import { TenantConnection } from 'src/tenant/tenant.connection';

@Module({
  controllers: [DataController],
  providers: [
    TenantService,
    {
      provide: 'TENANT_ID',
      useFactory: (req: Request) => req.headers['x-tenant-id'],
      inject: [REQUEST]
    },
    tenantConnectionFactory,
  ],
})
export class DataModule { }
