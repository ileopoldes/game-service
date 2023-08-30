import { Game, Publisher } from '@prisma/client';
import { CreateGameDto, ReadGameDto, UpdateGameDto } from '../../game/dto';

export class TestUtil {
  static giveMeAValidPublisher(): Publisher {
    const publisher: Publisher = {
      id: 1,
      name: 'Valid User',
      phone: '3234234',
      siret: 12345678,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return publisher;
  }

  static giveMeAValidCreateGameDTO(): CreateGameDto {
    const game: CreateGameDto = {
      price: 49.99,
      publisherId: 1,
      releaseDate: new Date(),
      tags: ['Action', 'Adventure'],
      title: 'test game',
    };

    return game;
  }

  static giveMeAValidReadGameDTO(): ReadGameDto {
    const game: ReadGameDto = {
      id: 1,
      price: 49.99,
      publisherId: 1,
      releaseDate: new Date(),
      tags: ['Action', 'Adventure'],
      title: 'test game',
    };

    return game;
  }

  static giveMeAValidUpdateGameDTO(): UpdateGameDto {
    const game: UpdateGameDto = {
      price: 49.99,
      publisherId: 1,
      releaseDate: new Date(),
      tags: ['Action'],
      title: 'new test game',
    };

    return game;
  }
}
