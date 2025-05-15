import { Test, TestingModule } from '@nestjs/testing';
import { ClienteNaturalService } from './cliente-natural.service';

describe('ClienteNaturalService', () => {
  let service: ClienteNaturalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteNaturalService],
    }).compile();

    service = module.get<ClienteNaturalService>(ClienteNaturalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
