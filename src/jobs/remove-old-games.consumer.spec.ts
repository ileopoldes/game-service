import { Test, TestingModule } from '@nestjs/testing';
import { RemoveOldGamesConsumerService } from './remove-old-games.consumer';
import { GameService } from '../game/game.service';

describe('RemoveOldGamesConsumerService', () => {
  let service: RemoveOldGamesConsumerService;
  const deleteWithReleaseDateOlderThanMock = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveOldGamesConsumerService,
        {
          provide: GameService,
          useValue: {
            deleteWithReleaseDateOlderThan: deleteWithReleaseDateOlderThanMock,
          },
        },
      ],
    }).compile();

    service = module.get<RemoveOldGamesConsumerService>(
      RemoveOldGamesConsumerService,
    );
  });

  beforeEach(() => deleteWithReleaseDateOlderThanMock.mockReset());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('removeOldGamesJob', () => {
    it('should call game service method', async () => {
      const job = { data: 18 };
      await service.removeOldGamesJob(job as any);
      expect(deleteWithReleaseDateOlderThanMock).toBeCalledWith(job.data);
    });
  });
});
