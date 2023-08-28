import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
