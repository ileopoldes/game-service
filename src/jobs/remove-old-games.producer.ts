import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class RemoveOldGamesProducerService {
  DEFAULT_TOTAL_MONTH: number = 18;
  constructor(@InjectQueue('clean-old-games-queue') private queue: Queue) {}
  async startCleaning(totalMonth: number = this.DEFAULT_TOTAL_MONTH) {
    this.queue.add('remove-old-games-job', totalMonth);
  }
}
