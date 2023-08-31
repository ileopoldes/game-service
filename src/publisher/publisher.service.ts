import { Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryService } from '../repository/repository.service';
import { PublisherWithGames } from './model';
import { ReadPublisherDto } from 'src/game/dto/read-publisher.dto';

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

  async createTestPublisher(dto: ReadPublisherDto) {
    const publisher = await this.repository.publisher.create({
      data: { ...dto },
    });
    return publisher;
  }

  async findAll() {
    const publishers = await this.repository.publisher.findMany();
    return publishers;
  }
}
