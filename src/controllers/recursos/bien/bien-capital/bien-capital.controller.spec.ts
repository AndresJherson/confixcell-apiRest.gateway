import { Test, TestingModule } from '@nestjs/testing';
import { BienCapitalController } from './bien-capital.controller';

describe('BienCapitalController', () => {
  let controller: BienCapitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BienCapitalController],
    }).compile();

    controller = module.get<BienCapitalController>(BienCapitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
