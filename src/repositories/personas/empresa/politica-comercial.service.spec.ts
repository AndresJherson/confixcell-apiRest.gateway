import { Test, TestingModule } from '@nestjs/testing';
import { PoliticaComercialService } from './politica-comercial.service';

describe('PoliticaComercialService', () => {
  let service: PoliticaComercialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliticaComercialService],
    }).compile();

    service = module.get<PoliticaComercialService>(PoliticaComercialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
