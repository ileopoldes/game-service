import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto, ReadGameDto, UpdateGameDto } from './dto';
import { RepositoryService } from '../repository/repository.service';
import { PublisherService } from '../publisher/publisher.service';
import { ReadPublisherDto } from './dto/read-publisher.dto';
import { Game, Publisher } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(
    private readonly repository: RepositoryService,
    private readonly publisherService: PublisherService,
  ) {}
  async create(createGameDto: CreateGameDto): Promise<CreateGameDto> {
    try {
      await this.publisherService.isValidPublisher(createGameDto.publisherId);

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

  async findAll(): Promise<ReadGameDto[]> {
    try {
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

  async findOne(id: number): Promise<ReadGameDto> {
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

  async update(
    id: number,
    updateGameDto: UpdateGameDto,
  ): Promise<UpdateGameDto> {
    try {
      const game = await this.repository.game.findUnique({
        where: { id },
      });

      if (!game) {
        throw new NotFoundException(`No game with id ${id} was found`);
      }

      if (
        updateGameDto.publisherId &&
        updateGameDto.publisherId !== game.publisherId
      ) {
        throw new BadRequestException(
          `The publisher with id ${updateGameDto.publisherId} is not the owner of the game ${id}`,
        );
      }

      const updatedGameData = await this.repository.game.update({
        where: { id },
        data: { ...updateGameDto },
      });
      return updatedGameData;
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const game = await this.repository.game.findUnique({
        where: { id },
      });

      if (!game) {
        throw new NotFoundException(`No game with id ${id} was found`);
      }

      await this.repository.game.delete({
        where: { id },
      });
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  async findPublisherDataByGameId(id: number): Promise<ReadPublisherDto> {
    try {
      const game = await this.repository.game.findUnique({
        where: {
          id,
        },
        include: { publisher: true },
      });

      if (!game) {
        throw new NotFoundException(`No game with id ${id} was found`);
      }

      return game.publisher;
    } catch (error) {
      Logger.debug(error);
      throw error;
    }
  }

  async findAllGamesByPublisherId(publisherId: number): Promise<Game[]> {
    const publisher = await this.publisherService.findPublisherById(
      publisherId,
      true,
    );

    if (!publisher.games || publisher.games.length === 0) {
      throw new NotFoundException('No games was found for the given publisher');
    }

    return publisher.games;
  }
}
