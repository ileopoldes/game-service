import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CLEAN_OLD_GAME_JOB, CLEAN_OLD_GAME_QUEUE } from './constants';

@Injectable()
export class RemoveOldGamesProducerService {
  DEFAULT_TOTAL_MONTH: number = 18;
  constructor(@InjectQueue(CLEAN_OLD_GAME_QUEUE) private queue: Queue) {}
  async startCleaning(totalMonth: number = this.DEFAULT_TOTAL_MONTH) {
    this.queue.add(CLEAN_OLD_GAME_JOB, totalMonth);
    console.log('>>> Bender - produzindo', totalMonth);
  }
}
