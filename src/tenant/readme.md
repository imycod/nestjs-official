# 多租户数据库连接

## 问题

1. 如何在 NestJS 中实现多租户数据库连接？

## 解决方案

1. 使用方式1
   tenant.connection.providers.ts

```ts
import { Inject, Injectable } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantConnection } from './tenant.connection';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TenantConnectionFactory {
  constructor(
    private readonly tenantService: TenantService,
    @Inject('TENANT_ID') private readonly tenantId: string,
  ) {
    console.log('TenantConnectionFactory - tenantId:', this.tenantId); // 添加日志
  }

  createConnection() {
    const config = this.tenantService.getConfig(this.tenantId);
    return new TenantConnection(config!);
  }
}

export const connectionProviders = [
  {
    // TENANT_CONNECTION 是一个请求作用域（Request-scoped）的提供者，因为它依赖于 REQUEST 对象（通过 x-tenant-id 请求头）
    provide: 'TENANT_ID',
    useFactory: (request: any) => {
      console.log('useFactory TENANT_ID:');
      return request.headers['x-tenant-id'];
    },
    inject: [REQUEST],
  },
  {
    // - 依赖于 TENANT_ID （请求作用域）
    // 因为依赖了请求作用域的提供者，所以它也自动成为请求作用域
    provide: 'TENANT_CONNECTION',
    useFactory: async (tenantService: TenantService, tenantId: string) => {
      console.log('useFactory TENANT_CONNECTION:');
      const config = tenantService.getConfig(tenantId);
      return new TenantConnection(config!);
    },
    inject: [TenantService, 'TENANT_ID'], // 注入动态参数
  },
];
```

tenant.module.ts

```ts
import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { connectionProviders } from './tenant.connection.providers';

@Module({
  imports: [],
  controllers: [],
  providers: [TenantService, ...connectionProviders],
  exports: [TenantService, ...connectionProviders],
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
```

tenant.connection.ts

```ts
import { Injectable } from '@nestjs/common';
import { IConfig } from './interface/connection.type';

@Injectable()
export class TenantConnection {
  constructor(private readonly config: IConfig) {
    console.log('Creating new connection for:', config.host);
  }

  async query(sql: string) {
    console.log(`Execute on ${this.config.host} ${this.config.database}`);
  }
}
```

data.controller.ts

```ts
import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { TenantConnection } from 'src/tenant/tenant.connection';
import { TenantService } from 'src/tenant/tenant.service';
import { Request } from 'express';

@Controller('data')
export class DataController {
  constructor(
    @Inject('TENANT_CONNECTION') private readonly connection: TenantConnection,
  ) {
    console.log('DataController - constructor'); // 添加日志
  }

  @Get()
  async getData() {
    return this.connection.query('SELECT * FROM users');
  }
}
```
