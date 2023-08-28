import { Module } from '@nestjs/common';
import { PublisherModule } from './publisher/publisher.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [PublisherModule, GameModule],
})
export class AppModule {}
