import { Test, TestingModule } from '@nestjs/testing';
import { ProductoCategoriaController } from './producto-categoria.controller';

describe('ProductoCategoriaController', () => {
  let controller: ProductoCategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoCategoriaController],
    }).compile();

    controller = module.get<ProductoCategoriaController>(ProductoCategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
