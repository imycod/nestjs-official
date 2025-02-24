import { Controller, Get, Inject, Req } from '@nestjs/common';
import { TenantConnectionService } from 'src/tenant/tenant-connection.service';
import { TenantConnection } from 'src/tenant/tenant.connection';

@Controller('data')
export class DataController {
    private readonly connection: TenantConnection;
    constructor(
        private readonly tenantConnectionService: TenantConnectionService,
    ) {
        console.log('DataController - constructor'); // 添加日志
        this.connection = this.tenantConnectionService.createConnection();
    }

    @Get()
    async getData() {
        const users = await this.connection.query('select * from user')
        return users;
    }
}
