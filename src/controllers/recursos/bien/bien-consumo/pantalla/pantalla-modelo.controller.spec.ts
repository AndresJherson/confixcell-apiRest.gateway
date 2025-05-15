import { Test, TestingModule } from '@nestjs/testing';
import { PantallaModeloController } from './pantalla-modelo.controller';

describe('PantallaModeloController', () => {
  let controller: PantallaModeloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PantallaModeloController],
    }).compile();

    controller = module.get<PantallaModeloController>(PantallaModeloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
