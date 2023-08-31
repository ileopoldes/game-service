import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { JobDto } from 'src/game/dto';
import { DISCOUNT_JOB, DISCOUNT_QUEUE } from './constants';

@Injectable()
export class ApplyDiscountProducerService {
  DEFAULT_PERCENTUAL: number = 20;
  constructor(@InjectQueue(DISCOUNT_QUEUE) private queue: Queue) {}
  async applyDiscount(jobDto: JobDto) {
    this.queue.add(DISCOUNT_JOB, jobDto);
  }
}
