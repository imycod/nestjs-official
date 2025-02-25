import { Injectable, NotFoundException } from '@nestjs/common';
import { IConfig } from './interface/connection.type';

// TenantService 是一个单例（Singleton）服务，在整个应用中共享
@Injectable()
export class TenantService {
  private readonly tenants = new Map([
    [
      'tenant1',
      {
        host: 'localhost',
        port: 3306,
        username: 'user1',
        password: 'password1',
        database: 'db1',
      },
    ],
    [
      'tenant2',
      {
        host: 'localhost',
        port: 3306,
        username: 'user2',
        password: 'password2',
        database: 'db2',
      },
    ],
  ]);

  getConfig(tenantId: string): IConfig {
    const config = this.tenants.get(tenantId);
    if (!config) {
      throw new NotFoundException(
        `Tenant configuration not found for tenant: ${tenantId}`,
      );
    }
    return config;
  }
}
