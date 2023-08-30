import { Injectable, NotFoundException } from '@nestjs/common';
import { Publisher } from '@prisma/client';
import { RepositoryService } from '../repository/repository.service';

@Injectable()
export class PublisherService {
  constructor(private readonly repository: RepositoryService) {}
  async isValidPublisher(id: number): Promise<boolean> {
    const publisher = await this.findPublisherById(id);
    return !!publisher;
  }
  async findPublisherById(id: number): Promise<Publisher> {
    const publisher = await this.repository.publisher.findUnique({
      where: {
        id,
      },
    });

    if (!publisher) {
      throw new NotFoundException('Publisher not found');
    }
    return publisher;
  }
}
