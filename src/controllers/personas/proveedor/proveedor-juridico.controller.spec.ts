import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorJuridicoController } from './proveedor-juridico.controller';

describe('ProveedorJuridicoController', () => {
  let controller: ProveedorJuridicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProveedorJuridicoController],
    }).compile();

    controller = module.get<ProveedorJuridicoController>(ProveedorJuridicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
