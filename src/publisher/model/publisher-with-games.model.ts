import { Game } from '@prisma/client';

export type PublisherWithGames = {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  name: string;
  siret: number;
  phone: string;

  games?: Game[];
};
