import { Module } from '@nestjs/common';
import { PublisherModule } from './publisher/publisher.module';
import { GameModule } from './game/game.module';
import { RepositoryModule } from './repository/repository.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './middlewares/global-exception.filter';

@Module({
  imports: [PublisherModule, GameModule, RepositoryModule],
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
