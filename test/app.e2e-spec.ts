import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { TestUtil } from '../src/common/test';
import { RepositoryService } from '../src/repository/repository.service';
import { NestFactory } from '@nestjs/core';
import { Game, Publisher } from '@prisma/client';

describe('AppController (e2e) - game service', () => {
  let app: INestApplication;
  let repository: RepositoryService;
  let publisherTest: Publisher;
  let gameTest: Game;
  const port = 3333;
  const url_base = `http://localhost:${port}/games`;
  beforeEach(async () => {
    // const moduleFixture: TestingModule = await Test.createTestingModule({
    //   imports: [AppModule],
    // }).compile();
    // app = moduleFixture.createNestApplication();
    app = await NestFactory.create(AppModule, { logger: false });
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
    await app.listen(port);

    repository = app.get(RepositoryService);
    await repository.cleanDb();

    const publisherDto = TestUtil.giveMeAValidPublisherDto();
    publisherTest = await repository.publisher.create({
      data: {
        ...publisherDto,
        createdAt: new Date(),
      },
    });

    const gameCreateDto = TestUtil.giveMeAValidCreateGameDTO();
    gameCreateDto.publisherId = publisherTest.id;
    gameTest = await repository.game.create({ data: gameCreateDto });
  });

  afterEach(() => {
    app.close();
    repository.$disconnect();
  });

  describe('games', () => {
    describe('create', () => {
      it('should throw an error if the publisher id is not valid', () => {
        const gameCreateDto = TestUtil.giveMeAnInvalidCreateGameDTO();
        return pactum
          .spec()
          .post(`${url_base}`)
          .withBody(gameCreateDto)
          .expectStatus(404)
          .expectBodyContains('Publisher not found');
      });
      it('should throw if a required field was not provided', () => {
        const gameCreateDto = TestUtil.giveMeAnInvalidCreateGameDTO();
        gameCreateDto.title = '';
        return pactum
          .spec()
          .post(`${url_base}`)
          .withBody(gameCreateDto)
          .expectStatus(400)
          .expectBodyContains('title should not be empty');
      });
      it('should create a game', () => {
        const gameCreateDto = TestUtil.giveMeAValidCreateGameDTO();
        gameCreateDto.publisherId = publisherTest.id;
        return pactum
          .spec()
          .post(`${url_base}`)
          .withBody(gameCreateDto)
          .expectStatus(201)
          .stores('gameId', 'id')
          .stores('publisherId', 'publisherId');
      });
    });

    describe('findAll', () => {
      it('should return a list of games', async () => {
        return pactum
          .spec()
          .get(`${url_base}/all`)
          .expectStatus(200)
          .expectJsonLength(1);
      });
      it('should throw if there is no games', async () => {
        await repository.cleanDb();
        return pactum.spec().get(`${url_base}/all`).expectStatus(404);
      });
    });

    describe('findAllByPublisher', () => {
      it('should throw if publisher doesn`t exist', () => {
        return pactum
          .spec()
          .get(`${url_base}/all/publisher/666`)
          .expectStatus(404)
          .expectBodyContains('Publisher not found');
      });
      it('should throw if publisher id is not valid', () => {
        return pactum
          .spec()
          .get(`${url_base}/all/publisher/PUBLISHER_ID_NOT_VALID`)
          .expectStatus(400)
          .expectBodyContains('Validation failed (numeric string is expected)');
      });
      it('should return a list of games from a especific publisher', () => {
        return pactum
          .spec()
          .get(`${url_base}/all/publisher/${publisherTest.id}`)
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('findOne', () => {
      it('should throw if id is not numeric', () => {
        return pactum
          .spec()
          .get(`${url_base}/GAME_ID_NOT_VALID`)
          .expectStatus(400)
          .expectBodyContains('Validation failed (numeric string is expected)');
      });
      it('should throw if there is no game with the provided id', () => {
        return pactum
          .spec()
          .get(`${url_base}/$S{gameId}`)
          .expectStatus(404)
          .expectBodyContains('No game with id $S{gameId} was found');
      });
      it('should get a game', () => {
        return pactum
          .spec()
          .get(`${url_base}/${gameTest.id}`)
          .expectStatus(200)
          .expectBodyContains('id');
      });
    });

    describe('findPublisherDataById', () => {
      it('should throw if game id is not numeric', () => {
        return pactum
          .spec()
          .get(`${url_base}/GAME_ID_IS_NOT_A_NUMBER/publisher`)
          .expectStatus(400)
          .expectBodyContains('Validation failed (numeric string is expected)');
      });
      it('should throw if game id is invalid', () => {
        return pactum
          .spec()
          .get(`${url_base}/66666666/publisher`)
          .expectStatus(404)
          .expectBodyContains('No game with id 66666666 was found');
      });
      it('should get publisher data', () => {
        return pactum
          .spec()
          .get(`${url_base}/${gameTest.id}/publisher`)
          .expectStatus(200)
          .expectBodyContains('name');
      });
    });

    describe('update', () => {
      it('should throw if id is not numeric', () => {
        return pactum
          .spec()
          .patch(`${url_base}/GAME_ID_IS_NOT_NUMERIC`)
          .expectStatus(400)
          .expectBodyContains('Validation failed (numeric string is expected)');
      });
      it('should throw if none fields were provided', () => {
        return pactum
          .spec()
          .patch(`${url_base}/${gameTest.id}`)
          .withBody({})
          .expectStatus(400)
          .expectBodyContains('At least one field should be provided');
      });
      it('should update the game data', () => {
        return pactum
          .spec()
          .patch(`${url_base}/${gameTest.id}`)
          .withBody({ title: 'Title was changed' })
          .expectStatus(200)
          .expectBodyContains('title');
      });
    });

    describe('delete', () => {
      it('should throw if id is not numeric', () => {
        return pactum
          .spec()
          .delete(`${url_base}/GAME_ID_IS_NOT_VALID`)
          .withBody({ title: 'Title was changed' })
          .expectStatus(400)
          .expectBodyContains('Validation failed (numeric string is expected)');
      });
      it('should throw if game doesn`t exist', () => {
        return pactum
          .spec()
          .delete(`${url_base}/6666666666666`)
          .withBody({ title: 'Title was changed' })
          .expectStatus(400);
      });
      it.todo('should return NON_CONTENT');
    });

    describe('applyDiscount', () => {
      it.todo('should delete old game');
      it.todo('should update game price');
    });
  });
});
