import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PublisherService } from '../publisher/publisher.service';

@Module({
  controllers: [GameController],
  providers: [GameService, PublisherService],
})
export class GameModule {}
