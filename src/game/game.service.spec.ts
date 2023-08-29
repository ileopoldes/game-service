import { Test, TestingModule } from '@nestjs/testing';
import { Publisher } from '@prisma/client';
import { GameService } from './game.service';
import { CreateGameDto } from './dto';
import { RepositoryService } from '../repository/repository.service';

describe('GameService', () => {
  let service: GameService;
  const findUniqueMock = jest.fn();
  const createMock = jest.fn();

  const createGameDto: CreateGameDto = {
    price: 49.99,
    publisherId: 1,
    releaseDate: new Date(),
    tags: ['Action', 'Adventure'],
    title: 'test game',
  };

  const mockPublisher: Publisher = {
    id: 1,
    name: 'Publisher 1',
    phone: '324343',
    siret: 12345,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: RepositoryService,
          useValue: {
            publisher: {
              findUnique: findUniqueMock,
            },
            game: {
              create: createMock,
            },
          },
        },
      ],
    }).compile();

    service = await module.get<GameService>(GameService);
  });

  describe('create', () => {
    it('should throw an error for non-existing user', async () => {
      createGameDto.publisherId = 666;
      findUniqueMock.mockReturnValue(null);
      await expect(service.create(createGameDto)).rejects.toThrowError(
        'Publisher not found',
      );
    });

    it('should create a new game', async () => {
      findUniqueMock.mockResolvedValue(mockPublisher);
      createMock.mockResolvedValue(createGameDto);
      const result = await service.create(createGameDto);
      expect(result).toBe(createGameDto);
    });
  });
});
