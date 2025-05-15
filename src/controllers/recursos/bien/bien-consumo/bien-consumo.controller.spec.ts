import { Test, TestingModule } from '@nestjs/testing';
import { BienConsumoController } from './bien-consumo.controller';

describe('BienConsumoController', () => {
  let controller: BienConsumoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BienConsumoController],
    }).compile();

    controller = module.get<BienConsumoController>(BienConsumoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
