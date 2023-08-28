import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { RepositoryService } from '../repository/repository.service';

@Module({
  providers: [PublisherService, RepositoryService],
})
export class PublisherModule {}
