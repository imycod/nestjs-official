import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantConnectionFactory } from './tenant.connection.factory';
import { REQUEST } from '@nestjs/core';

@Module({
    imports: [],
    controllers: [],
    providers: [
       
    ],
})
export class TenantModule { }
