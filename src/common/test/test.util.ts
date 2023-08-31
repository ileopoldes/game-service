import { Game, Publisher } from '@prisma/client';
import {
  CreateGameDto,
  JobDto,
  ReadGameDto,
  UpdateGameDto,
} from '../../game/dto';
import { PublisherWithGames } from 'src/publisher/model';
import { Job } from 'bull';

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

  static giveMeAValidGameWithPublisherData(): Game {
    const publisherData: Publisher = TestUtil.giveMeAValidPublisher();

    const game: Game = {
      id: 1,
      price: 49.99,
      publisherId: 1,
      releaseDate: new Date(),
      tags: ['Action', 'Adventure'],
      title: 'test game',
      createdAt: null,
      updatedAt: null,
    };

    game['publisher'] = publisherData;

    return game;
  }

  static giveMeAValidPublisherModel(): Publisher {
    const publisherData: Publisher = {
      createdAt: null,
      id: 1,
      name: 'Publisher test that comes with game',
      phone: '12341234',
      siret: 134341234123,
      updatedAt: null,
    };

    return publisherData;
  }

  static giveMeAValidPublisherWithGames(): PublisherWithGames {
    const publisherData = TestUtil.giveMeAValidPublisherModel();
    const publisher: PublisherWithGames = {
      ...publisherData,
      games: [TestUtil.giveMeAValidGameModel()],
    };

    return publisher;
  }

  static giveMeAValidPublisherWithEmptyGames(): PublisherWithGames {
    const publisherData = TestUtil.giveMeAValidPublisherModel();
    const publisher: PublisherWithGames = {
      ...publisherData,
      games: [],
    };

    return publisher;
  }

  static giveMeAValidGameModel(): Game {
    const game = TestUtil.giveMeAValidReadGameDTO();
    const gameModel: Game = {
      ...game,
      createdAt: null,
      updatedAt: null,
      id: 1,
    };

    return gameModel;
  }

  static giveMeAJobDto(): JobDto {
    const job: JobDto = {
      discount: 20,
      totalMonth: 18,
    };

    return job;
  }
}
