import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { PublisherModule } from './publisher/publisher.module';
import { GameModule } from './game/game.module';
import { RepositoryModule } from './repository/repository.module';
import { GlobalExceptionFilter } from './middlewares/global-exception.filter';

@Module({
  imports: [
    PublisherModule,
    GameModule,
    RepositoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [{ provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
