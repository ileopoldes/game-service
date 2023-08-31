import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublisherService } from './publisher.service';
import { ReadPublisherDto } from 'src/game/dto/read-publisher.dto';

@ApiTags('publisher')
@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  createTestPublisher(@Body() dto: ReadPublisherDto) {
    return this.publisherService.createTestPublisher(dto);
  }

  @Get()
  findAllPublishers() {
    return this.publisherService.findAll();
  }
}
