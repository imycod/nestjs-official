import { Controller, Get } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Controller('data')
export class DataController {
    constructor(private moduleRef:ModuleRef) { }

    @Get()
    async getData() {
        const connection = this.moduleRef.get('TENANT_CONNECTION',{
            strict:true
        });
        return connection.query('SELECT * FROM tenant_data');
    }
}
