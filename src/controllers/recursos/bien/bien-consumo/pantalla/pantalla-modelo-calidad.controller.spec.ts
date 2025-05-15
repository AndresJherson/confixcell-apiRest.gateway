import { Test, TestingModule } from '@nestjs/testing';
import { PantallaModeloCalidadController } from './pantalla-modelo-calidad.controller';

describe('PantallaModeloCalidadController', () => {
  let controller: PantallaModeloCalidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PantallaModeloCalidadController],
    }).compile();

    controller = module.get<PantallaModeloCalidadController>(PantallaModeloCalidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
