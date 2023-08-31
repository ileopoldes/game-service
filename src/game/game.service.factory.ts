import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GameService } from './game.service';

@Injectable()
export class GameServiceFactory {
  constructor(private readonly moduleRef: ModuleRef) {}
  createGameService(): GameService {
    return this.moduleRef.get(GameService, { strict: false });
  }
}
