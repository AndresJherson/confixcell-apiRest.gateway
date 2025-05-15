import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorNaturalService } from './proveedor-natural.service';

describe('ProveedorNaturalService', () => {
  let service: ProveedorNaturalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProveedorNaturalService],
    }).compile();

    service = module.get<ProveedorNaturalService>(ProveedorNaturalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
