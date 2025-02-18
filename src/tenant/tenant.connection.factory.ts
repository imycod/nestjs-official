import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "./tenant.service";
import { TenantConnection } from "./tenant.connection";

@Injectable()
export class TenantConnectionFactory {
    constructor(private readonly tenantService: TenantService, @Inject('TENANT_ID') private readonly tenantId: string) {
        console.log('TenantConnectionFactory - tenantId:', this.tenantId); // 添加日志
    }

    createConnection() {
        const config = this.tenantService.getConfig(this.tenantId);
        return new TenantConnection(config!);
    }
}


// 3. 动态工厂创建连接（关键部分）
export const tenantConnectionProvider = {
    provide: 'TENANT_CONNECTION',
    useFactory: async (tenantService: TenantService, tenantId: string) => {
        const config = tenantService.getConfig(tenantId);
        return new TenantConnection(config!);
    },
    inject: [TenantService, 'TENANT_ID'] // 注入动态参数
};