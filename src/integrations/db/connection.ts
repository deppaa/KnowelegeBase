import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const backup = async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.publication_tag.deleteMany(),
    prisma.publication.deleteMany(),
    prisma.tags.deleteMany(),
  ]);
};
