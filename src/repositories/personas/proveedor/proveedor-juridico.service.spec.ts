import { Test, TestingModule } from '@nestjs/testing';
import { ProveedorJuridicoService } from './proveedor-juridico.service';

describe('ProveedorJuridicoService', () => {
  let service: ProveedorJuridicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProveedorJuridicoService],
    }).compile();

    service = module.get<ProveedorJuridicoService>(ProveedorJuridicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
