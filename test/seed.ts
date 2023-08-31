import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function seed() {
  // Create publishers
  const publisher1 = await prisma.publisher.create({
    data: {
      name: 'Publisher 1',
      siret: 123456789,
      phone: '123-456-7890',
    },
  });

  const publisher2 = await prisma.publisher.create({
    data: {
      name: 'Publisher 2',
      siret: 987654321,
      phone: '987-654-3210',
    },
  });

  const publisher3 = await prisma.publisher.create({
    data: {
      name: 'Publisher 3',
      siret: 456789123,
      phone: '456-789-1230',
    },
  });

  // Create games for each publisher
  await prisma.game.createMany({
    data: [
      {
        title: 'Game 1',
        price: 29.99,
        publisherId: publisher1.id,
        releaseDate: new Date('2020-01-15'),
      },
      {
        title: 'Game 2',
        price: 19.99,
        publisherId: publisher1.id,
        releaseDate: new Date('2021-05-20'),
      },
      {
        title: 'Game 3',
        price: 29.99,
        publisherId: publisher1.id,
        releaseDate: new Date('2020-01-15'),
      },
      {
        title: 'Game 4',
        price: 19.99,
        publisherId: publisher1.id,
        releaseDate: new Date('2021-05-20'),
      },
      //

      {
        title: 'Game 6',
        price: 39.99,
        publisherId: publisher2.id,
        releaseDate: new Date('2019-09-10'),
      },
      {
        title: 'Game 7',
        price: 49.99,
        publisherId: publisher2.id,
        releaseDate: new Date('2022-03-01'),
      },
      {
        title: 'Game 8',
        price: 39.99,
        publisherId: publisher2.id,
        releaseDate: new Date('2019-09-10'),
      },
      {
        title: 'Game 9',
        price: 49.99,
        publisherId: publisher2.id,
        releaseDate: new Date('2022-03-01'),
      },
      {
        title: 'Game 10',
        price: 39.99,
        publisherId: publisher2.id,
        releaseDate: new Date('2019-09-10'),
      },
      {
        title: 'Game 5',
        price: 49.99,
        publisherId: publisher2.id,
        releaseDate: new Date('2022-03-01'),
      },
      //

      {
        title: 'Game 11',
        price: 14.99,
        publisherId: publisher3.id,
        releaseDate: new Date('2022-08-25'),
      },
      {
        title: 'Game 12',
        price: 24.99,
        publisherId: publisher3.id,
        releaseDate: new Date('2020-11-08'),
      },
    ],
  });
}

seed()
  .catch((error) => {
    console.error('Error seeding database:', error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
