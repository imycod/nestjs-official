import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AdminController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });


  it('should return admin', async ()=> {
    await request(app.getHttpServer()).get('/').set('Host', 'admin.example.com').expect(200).expect('Admin');
  }) 

  afterAll(async () => {  
    await app.close();
  })
});
