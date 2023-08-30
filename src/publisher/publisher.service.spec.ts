import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';
import { RepositoryService } from '../repository/repository.service';
import { TestUtil } from '../common/test';
import { NotFoundException } from '@nestjs/common';

describe('PublisherService', () => {
  let service: PublisherService;
  const findUniqueMock = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublisherService,
        {
          provide: RepositoryService,
          useValue: {
            publisher: {
              findUnique: findUniqueMock,
            },
          },
        },
      ],
    }).compile();

    service = module.get<PublisherService>(PublisherService);
  });

  beforeEach(() => findUniqueMock.mockReset());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPublisherById', () => {
    it('should find a user and return the data', async () => {
      const publisherMock = TestUtil.giveMeAValidPublisher();
      findUniqueMock.mockResolvedValue(publisherMock);
      const publisher = await service.findPublisherById(1);
      expect(publisher).toEqual(publisher);
      expect(findUniqueMock).toHaveBeenCalledTimes(1);
      expect(findUniqueMock).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
      });
    });
    it('should throw if user not found', async () => {
      findUniqueMock.mockResolvedValue(null);
      await expect(service.findPublisherById(666)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
    it('should have game data if flag is true', async () => {
      const publisherMock = TestUtil.giveMeAValidPublisher();
      findUniqueMock.mockResolvedValue(publisherMock);
      await service.findPublisherById(1, true);

      expect(findUniqueMock).toHaveBeenCalledTimes(1);
      expect(findUniqueMock).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        include: { games: true },
      });
    });
  });

  describe('isValidPublisher', () => {
    it('should return true if user exists', async () => {
      const publisherMock = TestUtil.giveMeAValidPublisher();
      findUniqueMock.mockResolvedValue(publisherMock);
      const isValidPublisher = await service.isValidPublisher(1);
      expect(isValidPublisher).toBeTruthy();
    });
    it('should throw if user doesn`t exist', async () => {
      findUniqueMock.mockResolvedValue(null);
      await expect(service.isValidPublisher(666)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
