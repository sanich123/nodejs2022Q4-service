-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;
