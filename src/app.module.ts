import { join } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AccountController } from './account/account.controller';
import { AdminController } from './admin/admin.controller';
import { DocsController } from './docs/docs.controller';
import { DataModule } from './data/data.module';
import { TenantModule } from './tenant/tenant.module';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigModule } from './custom-config/custom-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', join(__dirname, '../', `.env.${process.env.NODE_ENV}`)],
      isGlobal: true,
    }),
    TenantModule,
    DataModule,
    CustomConfigModule.register({ folder: 'config' })
  ],
  controllers: [AppController, CatsController, AccountController, AdminController, DocsController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log('AppModule constructor');
  }
  onModuleInit() {
    console.log('AppModule onModuleInit');
  }
  onModuleDestroy() {
    console.log('AppModule onModuleDestroy');
  }
  onApplicationBootstrap() {
    console.log('AppModule onApplicationBootstrap');
  }
  onApplicationShutdown() {
    console.log('AppModule onApplicationShutdown');
  }
}
