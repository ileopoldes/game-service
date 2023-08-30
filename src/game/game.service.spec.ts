import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { RepositoryService } from '../repository/repository.service';
import { TestUtil } from '../common/test';
import { PublisherService } from '../publisher/publisher.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('GameService', () => {
  let service: GameService;
  const createMock = jest.fn();
  const findUniqueMock = jest.fn();
  const findManyMock = jest.fn();
  const updateMock = jest.fn();
  const deleteMock = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        PublisherService,
        {
          provide: RepositoryService,
          useValue: {
            publisher: {
              findUnique: findUniqueMock,
            },
            game: {
              create: createMock,
              findMany: findManyMock,
              findUnique: findUniqueMock,
              update: updateMock,
              delete: deleteMock,
            },
          },
        },
      ],
    }).compile();

    service = await module.get<GameService>(GameService);
  });

  beforeEach(() => {
    createMock.mockReset();
    findUniqueMock.mockReset();
    findManyMock.mockReset();
    updateMock.mockReset();
    deleteMock.mockReset();
  });

  describe('create', () => {
    it('should create a new game', async () => {
      const mockGame = TestUtil.giveMeAValidCreateGameDTO();
      const mockPublisher = TestUtil.giveMeAValidPublisher();
      findUniqueMock.mockResolvedValue(mockPublisher);
      createMock.mockResolvedValue(mockGame);
      const result = await service.create(mockGame);
      expect(result).toBe(mockGame);
      expect(createMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a list of games', async () => {
      const mockGames = [TestUtil.giveMeAValidCreateGameDTO()];
      findManyMock.mockResolvedValue(mockGames);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(findManyMock).toHaveBeenCalledTimes(1);
    });
    it('should throw if there is no games', async () => {
      findManyMock.mockResolvedValue(null);
      await expect(service.findAll()).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return one game by its id', async () => {
      const mockGame = TestUtil.giveMeAValidReadGameDTO();
      findUniqueMock.mockResolvedValue(mockGame);
      const result = await service.findOne(mockGame.id);
      expect(result).toEqual(mockGame);
    });
    it('should throw if there is no games with the provided id', async () => {
      findUniqueMock.mockResolvedValue(null);
      await expect(service.findOne(666)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should return the game by its id after update it', async () => {
      const mockGame = TestUtil.giveMeAValidReadGameDTO();
      const mockUpdateGame = TestUtil.giveMeAValidUpdateGameDTO();
      findUniqueMock.mockResolvedValue(mockGame);
      updateMock.mockResolvedValue(mockUpdateGame);
      const result = await service.update(1, mockUpdateGame);
      expect(result).toEqual(mockUpdateGame);
      expect(findUniqueMock).toBeCalled();
      expect(updateMock).toBeCalled();
    });
    it('should throw if there is no games with the provided id', async () => {
      const mockUpdateGame = TestUtil.giveMeAValidUpdateGameDTO();
      findUniqueMock.mockResolvedValue(null);
      await expect(service.update(666, mockUpdateGame)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
    it('should throw if the provided publisherId is not the games`s owner', async () => {
      const mockGame = TestUtil.giveMeAValidReadGameDTO();
      const mockUpdateGame = TestUtil.giveMeAValidUpdateGameDTO();
      mockUpdateGame.publisherId = 666;
      findUniqueMock.mockResolvedValue(mockGame);
      await expect(service.update(1, mockUpdateGame)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should return NO_CONTENT', async () => {
      const mockGame = TestUtil.giveMeAValidReadGameDTO();
      const gameId = mockGame.id;
      deleteMock.mockResolvedValue({});
      findUniqueMock.mockResolvedValue(mockGame);
      await service.remove(gameId);
      expect(deleteMock).toHaveBeenCalledWith({ where: { id: gameId } });
    });
    it('should throw if there is no games with the provided id', async () => {
      const gameId = 666;
      findUniqueMock.mockResolvedValue(null);
      await expect(service.remove(gameId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('findPublisherDataByGameId', () => {
    it('should throw if no game with provided id was found', async () => {
      const gameId = 666;
      findUniqueMock.mockResolvedValue(null);
      await expect(
        service.findPublisherDataByGameId(gameId),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
    it('should return publish data', async () => {
      const mockGame = TestUtil.giveMeAValidGameWithPublisherData();
      const mockPublisher = TestUtil.giveMeAValidPublisher();
      findUniqueMock.mockResolvedValue(mockGame);
      const result = await service.findPublisherDataByGameId(mockGame.id);
      expect(result).toEqual(mockPublisher);
    });
  });
});
