import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { INestApplication } from '@nestjs/common';
import { config } from 'dotenv';
import * as request from 'supertest';

config(); // 加载环境变量

console.log('process.env----', process.env)

describe('AccountController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('getInfo should return the account from the host', async () => {
    const host = process.env.TEST_ACCOUNT_HOST || 'john.doe.example.com'; // 从环境变量读取主机名，默认为 'john.doe.example.com'
    console.log(`Testing account from host: ${host}`);
    try {
      await request(app.getHttpServer())
        .get('/')
        .set('Host', host)
        .expect(200)
        .expect('john.doe');
    } catch (error) {
      throw error; // 重新抛出异常以便测试框架捕获
    }
  });

  it('getInfo 主机名不是example.com时抛出错误', async () => {
    const host = process.env.TEST_HOST || 'example.com'; // 从环境变量读取主机名，默认为 'example.com'

    try {
      await request(app.getHttpServer())
        .get('/')
        .set('Host', host)
        .expect(404)
        .expect({ message: 'Cannot GET /', error: 'Not Found', statusCode: 404 });
    } catch (error) {
      throw error; // 重新抛出异常以便测试框架捕获
    }
  });

  afterAll(async () => {
    await app.close();
  });
});