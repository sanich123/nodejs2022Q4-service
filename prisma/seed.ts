import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const user1 = await prisma.user.upsert({
    where: { login: 'sanich123' },
    update: {},
    create: {
      login: 'sanich123',
      password: '7fwd7rlm',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { login: 'sanich143' },
    update: {},
    create: {
      login: 'sanich143',
      password: '17011987',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
