import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateGameDto, UpdateGameDto } from './dto';
import { RepositoryService } from '../repository/repository.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GameService {
  constructor(private readonly repository: RepositoryService) {}
  async create(createGameDto: CreateGameDto) {
    try {
      const publisher = await this.repository.publisher.findUnique({
        where: {
          id: createGameDto.publisherId,
        },
      });

      if (!publisher) {
        throw new NotFoundException('Publisher not found');
      }

      const game = await this.repository.game.create({
        data: {
          ...createGameDto,
        },
      });
      return game;
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
