import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PublisherService } from '../publisher/publisher.service';
import {
  ApplyDiscountProducerService,
  RemoveOldGamesProducerService,
} from '../jobs';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'clean-old-games-queue',
    }),
    BullModule.registerQueue({
      name: 'apply-discount-queue',
    }),
  ],
  controllers: [GameController],
  providers: [
    GameService,
    PublisherService,
    RemoveOldGamesProducerService,
    ApplyDiscountProducerService,
  ],
  exports: [GameService],
})
export class GameModule {}
