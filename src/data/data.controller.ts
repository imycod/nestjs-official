import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { TenantConnection } from 'src/tenant/tenant.connection';
import { TenantService } from 'src/tenant/tenant.service';
import { Request } from 'express';

@Controller('data')
export class DataController {
    constructor(
        @Inject('TENANT_CONNECTION') private readonly connection: TenantConnection,
    ) { }

    @Get()
    async getData() {
        return this.connection.query('SELECT * FROM users');
    }
}
