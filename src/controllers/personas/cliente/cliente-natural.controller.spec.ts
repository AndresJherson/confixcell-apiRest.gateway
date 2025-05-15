import { Test, TestingModule } from '@nestjs/testing';
import { ClienteNaturalController } from './cliente-natural.controller';

describe('ClienteNaturalController', () => {
  let controller: ClienteNaturalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteNaturalController],
    }).compile();

    controller = module.get<ClienteNaturalController>(ClienteNaturalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
