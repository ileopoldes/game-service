import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { RepositoryService } from '../repository/repository.service';

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService, RepositoryService],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create endpoint', () => {
    it.todo('should throw if any required data was not provided');
    it.todo('should throw if publisher doesn`t exist');
    it.todo('should throw if any provided data is not valiable');
    it.todo('should return 201 and the created game');
  });
});
