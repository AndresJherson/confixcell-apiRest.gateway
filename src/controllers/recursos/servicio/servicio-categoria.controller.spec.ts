import { Test, TestingModule } from '@nestjs/testing';
import { ServicioCategoriaController } from './servicio-categoria.controller';

describe('ServicioCategoriaController', () => {
  let controller: ServicioCategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicioCategoriaController],
    }).compile();

    controller = module.get<ServicioCategoriaController>(ServicioCategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
