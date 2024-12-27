import { Publication, Tags } from '@prisma/client';
import { prisma } from '../connection';

export const getPublicationById = async (
  id: Publication['id'],
): Promise<(Publication & { tagIds: Tags['id'][] | undefined }) | null> => {
  const rows = await prisma.publication.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      Publication_tag: {
        select: {
          id: true,
        },
      },
    },
  });

  const result = {
    id: rows!.id,
    title: rows!.title,
    description: rows!.description,
    status: rows!.status,
    tagIds: rows?.Publication_tag.map((tag) => tag.id),
  };

  return result;
};

export const getListPublication = async ({
  tagIds,
  status,
}: {
  tagIds?: Tags['id'][];
  status?: Publication['status'];
}): Promise<(Publication & { tagIds: Tags['id'][] | undefined })[]> => {
  const rows = await prisma.publication.findMany({
    where: {
      ...(status && {
        status,
      }),
      ...(tagIds && {
        Publication_tag: {
          some: {
            tag_id: {
              in: tagIds,
            },
          },
        },
      }),
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      Publication_tag: {
        select: {
          tag_id: true,
        },
      },
    },
  });

  const result = rows.map((publication) => ({
    id: publication.id,
    title: publication.title,
    description: publication.description,
    status: publication.status,
    tagIds: publication.Publication_tag.map((tag) => tag.tag_id),
  }));

  return result;
};

export const updatePublicationById = async ({
  id,
  title,
  description,
  status,
}: Publication): Promise<Publication> => {
  const rows = await prisma.publication.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      status,
    },
  });

  return rows;
};

export const createPublication = async ({
  title,
  description,
  status,
}: Omit<Publication, 'id'>): Promise<Publication> => {
  const rows = await prisma.publication.create({
    data: {
      title,
      description,
      status,
    },
  });

  return rows;
};

export const deletePublicationById = async (
  id: Publication['id'],
): Promise<Publication['id']> => {
  const rows = await prisma.publication.delete({
    where: {
      id,
    },
  });

  return rows.id;
};
