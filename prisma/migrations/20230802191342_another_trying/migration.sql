-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistIdentity_fkey";

-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "artistIdentity" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistIdentity_fkey" FOREIGN KEY ("artistIdentity") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
