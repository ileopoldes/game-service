-- CreateTable
CREATE TABLE "publishers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "siret" INTEGER NOT NULL,
    "phone" TEXT,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER,
    "tags" TEXT[],
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "publisherId" INTEGER NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publishers_siret_key" ON "publishers"("siret");

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
