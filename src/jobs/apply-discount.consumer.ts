import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GameService } from '../game/game.service';
import { JobDto } from 'src/game/dto';

@Processor('apply-discount-queue')
export class ApplyDiscountConsumerService {
  constructor(private readonly gameService: GameService) {}
  @Process('apply-discount-job')
  async applyDicount(job: Job<JobDto>) {
    const { data } = job;
    const result = await this.gameService.applyDiscount(
      data.discount,
      data.totalMonth,
    );
    Logger.debug(`Total of ${result} games were impacted`);
  }
}
