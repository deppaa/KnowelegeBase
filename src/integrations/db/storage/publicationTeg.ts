import { Publication_tag } from '@prisma/client';
import { prisma } from '../connection';

export const createPublicationTeg = async ({
  publication_id,
  tag_id,
}: Omit<Publication_tag, 'id'>): Promise<Publication_tag> => {
  const rows = await prisma.publication_tag.create({
    data: {
      publication_id,
      tag_id,
    },
  });

  return rows;
};

export const getListPublicationTegByPublicationId = async (
  publication_id: Publication_tag['publication_id'],
): Promise<Publication_tag[]> => {
  const rows = await prisma.publication_tag.findMany({
    where: {
      publication_id,
    },
  });

  return rows;
};

export const deletePublicationTegById = async (
  id: Publication_tag['id'],
): Promise<Publication_tag['id']> => {
  const rows = await prisma.publication_tag.delete({
    where: {
      id,
    },
  });

  return rows.id;
};
