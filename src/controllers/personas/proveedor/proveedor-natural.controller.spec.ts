import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorNaturalController } from './proveedor-natural.controller';

describe('ProveedorNaturalController', () => {
  let controller: ProveedorNaturalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProveedorNaturalController],
    }).compile();

    controller = module.get<ProveedorNaturalController>(ProveedorNaturalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
