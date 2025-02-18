import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { tenantConnectionProvider, TenantConnectionFactory } from './tenant.connection.factory';
import { REQUEST } from '@nestjs/core';

// TENANT_CONNECTION 是一个请求作用域（Request-scoped）的提供者，因为它依赖于 REQUEST 对象（通过 x-tenant-id 请求头）
const TenantId = {
    provide: 'TENANT_ID',
    useFactory: (request: any) => {
        return request.headers['x-tenant-id'];
    },
    inject: [REQUEST],
}

@Module({
    imports: [],
    controllers: [],
    providers: [
        TenantService,
        TenantId,
        tenantConnectionProvider,
    ],
    exports: [TenantService, TenantId, tenantConnectionProvider],
})
export class TenantModule { }
