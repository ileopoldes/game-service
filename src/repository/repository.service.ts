import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RepositoryService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:12345@localhost:5434/ultra_game?schema=public',
        },
      },
    });
  }
}
