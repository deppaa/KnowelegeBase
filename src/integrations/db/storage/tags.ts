import { Tags } from '@prisma/client';
import { prisma } from '../connection';

export const getTagsById = async (id: Tags['id']): Promise<Tags | null> => {
  const rows = await prisma.tags.findFirst({
    where: {
      id,
    },
  });

  return rows;
};

export const getListTags = async (): Promise<Tags[]> => {
  const rows = await prisma.tags.findMany();

  return rows;
};

export const updateTagsById = async ({ id, title }: Tags): Promise<Tags> => {
  const rows = await prisma.tags.update({
    data: {
      title,
    },
    where: {
      id,
    },
  });

  return rows;
};

export const createTags = async (title: Tags['title']): Promise<Tags> => {
  const rows = await prisma.tags.create({
    data: {
      title,
    },
  });

  return rows;
};

export const deleteTagsById = async (id: Tags['id']): Promise<Tags['id']> => {
  const rows = await prisma.tags.delete({
    where: {
      id,
    },
  });

  return rows.id;
};
