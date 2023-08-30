import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TestUtil } from '../common/test';
import { UpdateGameDto } from './dto/update-game.dto';
import { BadRequestException } from '@nestjs/common';

describe('GameController', () => {
  let controller: GameController;
  const createMock = jest.fn();
  const findAllMock = jest.fn();
  const findOneMock = jest.fn();
  const updateMock = jest.fn();
  const deleteMock = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: GameService,
          useValue: {
            create: createMock,
            findOne: findOneMock,
            findAll: findAllMock,
            update: updateMock,
            delete: deleteMock,
          },
        },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  beforeEach(() => {
    createMock.mockReset();
    findOneMock.mockReset();
    findAllMock.mockReset();
    updateMock.mockReset();
    deleteMock.mockReset();
  });

  describe('create', () => {
    it('should create a new game', async () => {
      const mockGame = TestUtil.giveMeAValidCreateGameDTO();
      createMock.mockResolvedValue(mockGame);

      const result = await controller.create(mockGame);

      expect(result).toEqual(mockGame);
    });
  });

  describe('findAll', () => {
    it('should return a list of games', async () => {
      const mockGames = [TestUtil.giveMeAValidReadGameDTO()];
      findAllMock.mockResolvedValue(mockGames);

      const result = await controller.findAll();

      expect(result).toEqual(mockGames);
    });
  });

  describe('findOne', () => {
    it('should return one game by its id', async () => {
      const mockGame = TestUtil.giveMeAValidReadGameDTO();
      findOneMock.mockResolvedValue(mockGame);

      const result = await controller.findOne(mockGame.id.toString());

      expect(result).toEqual(mockGame);
    });
  });

  describe('update', () => {
    it('should update the game', async () => {
      const mockUpdatedGame = TestUtil.giveMeAValidUpdateGameDTO();
      updateMock.mockResolvedValue(mockUpdatedGame);

      const result = await controller.update('1', mockUpdatedGame);

      expect(result).toEqual(mockUpdatedGame);
    });

    it('should throw BadRequestException if no fields are provided', async () => {
      const mockUpdateGameDto: UpdateGameDto = {};
      try {
        await controller.update('1', mockUpdateGameDto);
        fail('Expected BadRequestException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('At least one field should be provided');
      }
    });
  });
});
