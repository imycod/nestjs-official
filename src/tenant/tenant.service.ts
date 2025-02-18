import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
    private readonly tenants = new Map([
        ['tenant1', { host: 'dbA', port: 3306,username:'',password:'', database:'' }],
        ['tenant2', { host: 'dbB', port: 3307,username:'',password:'', database:'' }],
    ]);

    getConfig(tenantId:string) {
        return this.tenants.get(tenantId);
    }
}
