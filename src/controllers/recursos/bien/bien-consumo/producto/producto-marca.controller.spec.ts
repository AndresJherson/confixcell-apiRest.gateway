import { Test, TestingModule } from '@nestjs/testing';
import { ProductoMarcaController } from './producto-marca.controller';

describe('ProductoMarcaController', () => {
  let controller: ProductoMarcaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoMarcaController],
    }).compile();

    controller = module.get<ProductoMarcaController>(ProductoMarcaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
