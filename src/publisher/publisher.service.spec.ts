import { Test, TestingModule } from '@nestjs/testing';
import { PublisherService } from './publisher.service';
import { RepositoryService } from '../repository/repository.service';

describe('PublisherService', () => {
  let service: PublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublisherService, RepositoryService],
    }).compile();

    service = module.get<PublisherService>(PublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
