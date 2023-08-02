import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();
async function main() {
  const id1 = v4();
  const id2 = v4();
  const id3 = v4();
  const id4 = v4();
  const id5 = v4();
  const id6 = v4();

  const user1 = await prisma.user.upsert({
    where: {
      id: id1,
    },
    update: {},
    create: {
      id: v4(),
      login: 'sanich123',
      password: '7fwd7rlm',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { id: id2 },
    update: {},
    create: {
      login: 'sanich143',
      password: '17011987',
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
    update: { artistIdentity: artist2.id },
    create: {
      name: 'Symphony #5',
      year: 1859,
      artistId: artist2.id,
    },
  });
  const album2 = await prisma.album.upsert({
    where: { id: id6 },
    update: { artistIdentity: artist2.id },
    create: {
      name: 'Symphony #7',
      year: 1861,
      artistIdentity: artist2.id,
    },
  });

  console.log({ user1, user2, artist1, artist2, album1, album2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
