import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';
import { hash } from 'bcrypt';

const { CRYPT_SALT } = process.env;

const prisma = new PrismaClient();

async function main() {
  const ids: { [key: string]: string } = {};

  for (let i = 1; i <= 8; i++) {
    ids[`id${i}`] = v4();
  }
  const { id1, id2, id3, id4, id5, id6, id7, id8 } = ids;

  const user1 = await prisma.user.upsert({
    where: { id: id1 },
    update: {},
    create: {
      login: 'sanich123',
      password: await hash('7fwd7rlm', +CRYPT_SALT),
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: id2 },
    update: {},
    create: {
      login: 'sanich143',
      password: await hash('17011987', +CRYPT_SALT),
    },
  });

  const artist1 = await prisma.artist.upsert({
    where: { id: id3 },
    update: {},
    create: {
      name: 'Snoop Dog',
      grammy: true,
    },
  });

  const artist2 = await prisma.artist.upsert({
    where: { id: id4 },
    update: {},
    create: {
      name: 'Beethoven',
      grammy: false,
    },
  });

  const album1 = await prisma.album.upsert({
    where: { id: id5 },
    update: { artistId: artist2.id },
    create: {
      name: 'Symphony #5',
      year: 1859,
      artistId: artist2.id,
    },
  });
  const album2 = await prisma.album.upsert({
    where: { id: id6 },
    update: { artistId: artist2.id },
    create: {
      name: 'Symphony #7',
      year: 1861,
      artistId: artist2.id,
    },
  });

  const track1 = await prisma.track.upsert({
    where: { id: id7 },
    update: { artistId: artist2.id, albumId: album2.id },
    create: {
      name: 'First movemento',
      duration: 235,
      artistId: artist2.id,
      albumId: album2.id,
    },
  });

  const track2 = await prisma.track.upsert({
    where: { id: id8 },
    update: { artistId: artist2.id, albumId: album2.id },
    create: {
      name: 'Second movemento',
      duration: 123,
      artistId: artist2.id,
      albumId: album2.id,
    },
  });

  console.log({ user1, user2, artist1, artist2, album1, album2, track1, track2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
