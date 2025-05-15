import { Test, TestingModule } from '@nestjs/testing';
import { ClienteJuridicoController } from './cliente-juridico.controller';

describe('ClienteJuridicoController', () => {
  let controller: ClienteJuridicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteJuridicoController],
    }).compile();

    controller = module.get<ClienteJuridicoController>(ClienteJuridicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
