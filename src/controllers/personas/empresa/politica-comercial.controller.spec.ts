import { Test, TestingModule } from '@nestjs/testing';
import { PoliticaComercialController } from './politica-comercial.controller';

describe('PoliticaComercialController', () => {
  let controller: PoliticaComercialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticaComercialController],
    }).compile();

    controller = module.get<PoliticaComercialController>(PoliticaComercialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
