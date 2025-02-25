import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './custom-config.module-definition';
import { CustomConfigOptions } from './custom-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: CustomConfigOptions,
    private readonly configService: ConfigService,
  ) {
    // console.log(this.options)
    // console.log(this.configService.get('APP_VERSION'))
    // console.log(this.configService.get('NODE_ENV'))
    // console.log(this.configService.get('DATABASE_USER'))
    // console.log(this.configService.get('DATABASE_PASSWORD'))
    // console.log(process.env.DATABASE_USER)
    // console.log(process.env.DATABASE_PASSWORD)
  }
}
