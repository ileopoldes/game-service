import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PublisherService } from '../publisher/publisher.service';
import {
  CLEAN_OLD_GAME_QUEUE,
  DISCOUNT_QUEUE,
  ApplyDiscountProducerService,
  RemoveOldGamesProducerService,
  RemoveOldGamesConsumerService,
  ApplyDiscountConsumerService,
} from './jobs';
import { BullModule } from '@nestjs/bull';
import { GameServiceFactory } from './game.service.factory';

@Module({
  imports: [
    BullModule.registerQueue({
      name: CLEAN_OLD_GAME_QUEUE,
    }),
    BullModule.registerQueue({
      name: DISCOUNT_QUEUE,
    }),
  ],
  controllers: [GameController],
  providers: [
    GameService,
    GameServiceFactory,
    PublisherService,
    RemoveOldGamesProducerService,
    RemoveOldGamesConsumerService,
    ApplyDiscountProducerService,
    ApplyDiscountConsumerService,
  ],
  exports: [GameService],
})
export class GameModule {}
