import { Test, TestingModule } from '@nestjs/testing';
import { BienCapitalService } from './bien-capital.service';

describe('BienCapitalService', () => {
  let service: BienCapitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BienCapitalService],
    }).compile();

    service = module.get<BienCapitalService>(BienCapitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
