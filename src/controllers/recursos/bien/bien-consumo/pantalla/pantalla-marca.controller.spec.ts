import { Test, TestingModule } from '@nestjs/testing';
import { PantallaMarcaController } from './pantalla-marca.controller';

describe('PantallaMarcaController', () => {
  let controller: PantallaMarcaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PantallaMarcaController],
    }).compile();

    controller = module.get<PantallaMarcaController>(PantallaMarcaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
