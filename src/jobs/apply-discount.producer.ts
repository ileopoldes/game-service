import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { JobDto } from 'src/game/dto';

@Injectable()
export class ApplyDiscountProducerService {
  DEFAULT_PERCENTUAL: number = 20;
  constructor(@InjectQueue('apply-discount-queue') private queue: Queue) {}
  async applyDiscount(jobDto: JobDto) {
    this.queue.add('apply-discount-job', jobDto);
  }
}
