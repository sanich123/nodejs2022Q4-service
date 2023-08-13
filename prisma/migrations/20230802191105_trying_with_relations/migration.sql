/*
  Warnings:

  - Added the required column `artistIdentity` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "artistIdentity" TEXT NOT NULL,
ALTER COLUMN "artistId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistIdentity_fkey" FOREIGN KEY ("artistIdentity") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
