import { ConfigurableModuleBuilder } from '@nestjs/common';
import { CustomConfigOptions } from './custom-config.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<CustomConfigOptions>().build();