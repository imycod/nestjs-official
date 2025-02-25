import { Controller, Get, Query, Req } from '@nestjs/common';
import { Request } from 'express';

interface CatFilter {
  type?: string;
  age?: number;
}

@Controller('cats')
export class CatsController {
  @Get('abcd/*')
  dynamic() {
    return 'This route uses a wildcard';
  }

  @Get('find')
  findCat(@Query('filters') filters: CatFilter[]) {
    return filters;
  }

  @Get()
  findAll(@Req() req: Request): string {
    return 'This action returns all cats';
  }
}
