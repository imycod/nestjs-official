import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { Request } from 'express';

describe('CatsController', () => {
  let catsController: CatsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  describe('findAll', () => {
    it('should return "This action returns all cats"', () => {
      const mockRequest: Request = {} as Request;
      expect(catsController.findAll(mockRequest)).toBe('This action returns all cats');
    });
  });

  describe('dynamic', () => {
    it('should return "This route uses a wildcard"', () => {
      expect(catsController.dynamic()).toBe('This route uses a wildcard');
    });
  });

  describe('findCat', () => {
    it('should return an empty array when no filters are provided', () => {
      expect(catsController.findCat([])).toEqual([]);
    });

    it('should return the provided filters array', () => {
      const filters = [{ type: 'Siamese' }, { age: 3 }];
      expect(catsController.findCat(filters)).toEqual(filters);
    });

    it('should handle undefined filters gracefully', () => {
      expect(catsController.findCat(undefined!)).toBeUndefined();
    });
  });
  
});