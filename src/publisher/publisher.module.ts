import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Module({
  providers: [PublisherService],
})
export class PublisherModule {}
