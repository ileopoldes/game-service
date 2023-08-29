import { Test, TestingModule } from '@nestjs/testing';
import { Publisher } from '@prisma/client';
import { GameService } from './game.service';
import { RepositoryService } from '../repository/repository.service';
import { CreateGameDto } from './dto/create-game.dto';

describe('GameService', () => {
  let service: GameService;
  let findUniqueMock: jest.Mock;

  const dto: CreateGameDto = {
    price: 0,
    publisherId: 666,
    releaseDate: new Date(),
    tags: [],
    title: 'test game',
  };

  /*
  const mockPublisher: Publisher = {
    id: 1,
    name: 'Publisher 1',
    phone: '324343',
    siret: 12345,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  */

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService, RepositoryService],
    })
      .overrideProvider(RepositoryService)
      .useValue({
        provide: RepositoryService,
        useValue: {
          publisher: {
            findUnique: findUniqueMock,
          },
        },
      })
      .compile();

    service = module.get<GameService>(GameService);
  });

  describe('create', () => {
    it('should throw an error for non-existing user', async () => {
      await expect(service.create(dto)).rejects.toThrowError(
        'Publisher not found',
      );
    });
  });
});
