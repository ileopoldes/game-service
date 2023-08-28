import { Module } from '@nestjs/common';
import { PublisherModule } from './publisher/publisher.module';
import { GameModule } from './game/game.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [PublisherModule, GameModule, RepositoryModule],
})
export class AppModule {}
