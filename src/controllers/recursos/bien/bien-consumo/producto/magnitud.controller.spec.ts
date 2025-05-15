import { Test, TestingModule } from '@nestjs/testing';
import { MagnitudController } from './magnitud.controller';

describe('MagnitudController', () => {
  let controller: MagnitudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagnitudController],
    }).compile();

    controller = module.get<MagnitudController>(MagnitudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
