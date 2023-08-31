import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GameService } from '../game/game.service';

@Processor('clean-old-games-queue')
export class RemoveOldGamesConsumerService {
  constructor(private readonly gameService: GameService) {}
  @Process('remove-old-games-job')
  async removeOldGamesJob(job: Job<number>) {
    const { data } = job;
    const result = await this.gameService.deleteWithReleaseDateOlderThan(data);
    Logger.debug(`Total of ${result} games were deleted`);
  }
}
