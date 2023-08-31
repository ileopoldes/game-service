import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';

@Module({
  providers: [PublisherService],
  exports: [PublisherService],
  controllers: [PublisherController],
})
export class PublisherModule {}
