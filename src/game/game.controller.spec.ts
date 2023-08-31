import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TestUtil } from '../common/test';
import { UpdateGameDto } from './dto/update-game.dto';
import { BadRequestException } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';

describe('GameController', () => {
  let controller: GameController;
  const createMock = jest.fn();
  const findAllMock = jest.fn();
  const findOneMock = jest.fn();
  const updateMock = jest.fn();
  const deleteMock = jest.fn();
  const findPublisherMock = jest.fn();
  const findAllGamesByPublisherMock = jest.fn();
  const startJobMock = jest.fn();

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
            findPublisherDataByGameId: findPublisherMock,
            findAllGamesByPublisherId: findAllGamesByPublisherMock,
            startJob: startJobMock,
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
    findPublisherMock.mockReset();
    findAllGamesByPublisherMock.mockReset();
    startJobMock.mockReset();
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

  describe('findPublisherDataById', () => {
    it('should call the service with the provided id', async () => {
      const mockGame = TestUtil.giveMeAValidGameWithPublisherData();
      const mockPublisher = TestUtil.giveMeAValidPublisher();
      findPublisherMock.mockResolvedValue(mockPublisher);

      await controller.findPublisherDataById(mockGame.id.toString());

      expect(findPublisherMock).toBeCalledWith(mockGame.id);
    });
  });

  describe('findAllByPublisher', () => {
    it('should call the service with the provided id', async () => {
      const mockGameList = [TestUtil.giveMeAValidReadGameDTO()];
      const publisherId: number = mockGameList[0].publisherId;
      findAllGamesByPublisherMock.mockReturnValue(mockGameList);

      await controller.findAllByPublisher(publisherId.toString());

      expect(findAllGamesByPublisherMock).toBeCalledWith(publisherId);
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

    describe('applyDiscount', () => {
      it('should call the service to trigger the process', async () => {
        const jobDto = TestUtil.giveMeAJobDto();
        await controller.applyDiscount(jobDto);
        expect(startJobMock).toBeCalledWith(jobDto);
      });
    });
  });
});
