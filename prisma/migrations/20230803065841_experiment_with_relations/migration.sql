/*
  Warnings:

  - You are about to drop the column `artistIdentity` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `albumIdentity` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `artistIdentity` on the `Track` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistIdentity_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumIdentity_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_artistIdentity_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "artistIdentity";

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "albumIdentity",
DROP COLUMN "artistIdentity";

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
