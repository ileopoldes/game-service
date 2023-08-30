import { Injectable, NotFoundException } from '@nestjs/common';
import { Publisher } from '@prisma/client';
import { RepositoryService } from '../repository/repository.service';
import { PublisherWithGames } from './model';

@Injectable()
export class PublisherService {
  constructor(private readonly repository: RepositoryService) {}

  async isValidPublisher(id: number): Promise<boolean> {
    const publisher = await this.findPublisherById(id);
    return !!publisher;
  }

  async findPublisherById(
    id: number,
    _withGameList: boolean = false,
  ): Promise<PublisherWithGames> {
    const options = {
      where: {
        id,
      },
    };

    if (_withGameList) {
      options['include'] = { games: true };
    }

    const publisher = await this.repository.publisher.findUnique(options);

    if (!publisher) {
      throw new NotFoundException('Publisher not found');
    }

    return publisher;
  }
}
