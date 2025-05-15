import { Test, TestingModule } from '@nestjs/testing';
import { DocumentoIdentificacionController } from './documento-identificacion.controller';

describe('DocumentoIdentificacionController', () => {
  let controller: DocumentoIdentificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentoIdentificacionController],
    }).compile();

    controller = module.get<DocumentoIdentificacionController>(DocumentoIdentificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
