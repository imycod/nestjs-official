import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './custom-config.module-definition';
import { CustomConfigService } from './custom-config.service';

@Module({
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule extends ConfigurableModuleClass {}
