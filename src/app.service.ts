import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('AppService constructor');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
