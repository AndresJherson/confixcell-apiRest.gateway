import { Test, TestingModule } from '@nestjs/testing';
import { BienConsumoService } from './bien-consumo.service';

describe('BienConsumoService', () => {
  let service: BienConsumoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BienConsumoService],
    }).compile();

    service = module.get<BienConsumoService>(BienConsumoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
