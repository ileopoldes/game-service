import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateGameDto, UpdateGameDto } from './dto';
import { RepositoryService } from '../repository/repository.service';
import { Game } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private readonly repository: RepositoryService) {}
  async create(createGameDto: CreateGameDto): Promise<CreateGameDto> {
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

  async findAll(): Promise<Game[]> {
    try {
      /* TODO: Bender - implemente pagination*/
      const games = await this.repository.game.findMany();

      if (!games) {
        throw new NotFoundException('No records found');
      }

      return games;
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Game> {
    try {
      const game = await this.repository.game.findUnique({
        where: {
          id,
        },
      });

      if (!game) {
        throw new NotFoundException(`No game with id ${id} was found`);
      }

      return game;
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    console.log(
      `>>>> Bender service: ${id} - ${JSON.stringify(updateGameDto)}`,
    );
    return `This action updates a #${id} game - with: ${JSON.stringify(
      updateGameDto,
    )}`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
