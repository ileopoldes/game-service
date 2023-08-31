import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CLEAN_OLD_GAME_JOB, CLEAN_OLD_GAME_QUEUE } from './constants';
import { GameServiceFactory } from '../game.service.factory';

@Injectable()
@Processor(CLEAN_OLD_GAME_QUEUE)
export class RemoveOldGamesConsumerService {
  constructor(private readonly gameServiceFactory: GameServiceFactory) {}
  @Process(CLEAN_OLD_GAME_JOB)
  async removeOldGamesJob(job: Job<number>) {
    const { data } = job;
    const gameService = this.gameServiceFactory.createGameService();
    const result = await gameService.deleteWithReleaseDateOlderThan(data);
    Logger.debug(`Total of ${result} games were deleted`);
  }
}
