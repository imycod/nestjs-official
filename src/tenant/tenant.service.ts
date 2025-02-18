import { Injectable } from '@nestjs/common';

// TenantService 是一个单例（Singleton）服务，在整个应用中共享
@Injectable()
export class TenantService {
    constructor() {
        console.log('TenantService - constructor'); // 添加日志
    }
    private readonly tenants = new Map([
        ['tenant1', { host: 'dbA', port: 3306, username: '', password: '', database: '' }],
        ['tenant2', { host: 'dbB', port: 3307, username: '', password: '', database: '' }],
    ]);

    getConfig(tenantId: string) {
        return this.tenants.get(tenantId);
    }
}
