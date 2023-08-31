import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { JobDto } from 'src/game/dto';
import { DISCOUNT_JOB, DISCOUNT_QUEUE } from './constants';
import { GameServiceFactory } from '../game.service.factory';

@Processor(DISCOUNT_QUEUE)
export class ApplyDiscountConsumerService {
  constructor(private readonly gameServiceFactory: GameServiceFactory) {}
  @Process(DISCOUNT_JOB)
  async applyDicount(job: Job<JobDto>) {
    const { data } = job;
    const gameService = this.gameServiceFactory.createGameService();
    const result = await gameService.applyDiscount(
      data.discount,
      data.totalMonth,
    );
    Logger.debug(`Total of ${result} games were impacted`);
  }
}
