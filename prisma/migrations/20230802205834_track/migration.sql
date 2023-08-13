-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "artistIdentity" TEXT,
    "albumIdentity" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistIdentity_fkey" FOREIGN KEY ("artistIdentity") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumIdentity_fkey" FOREIGN KEY ("albumIdentity") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
