import { Test, TestingModule } from '@nestjs/testing';
import { ClienteJuridicoService } from './cliente-juridico.service';

describe('ClienteJuridicoService', () => {
  let service: ClienteJuridicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteJuridicoService],
    }).compile();

    service = module.get<ClienteJuridicoService>(ClienteJuridicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
