import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AccountController } from './account/account.controller';
import { AdminController } from './admin/admin.controller';
import { DocsController } from './docs/docs.controller';
import { DataModule } from './data/data.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [TenantModule, DataModule],
  controllers: [AppController, CatsController, AccountController, AdminController, DocsController],
  providers: [AppService],
})
export class AppModule { }
