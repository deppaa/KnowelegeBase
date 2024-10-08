import { db } from '../connection';
import { PublicationTag } from './types';

const COLUMNS = ['publication_id', 'tag_id'];

export const createPublicationTeg = async ({
  publication_id,
  tag_id,
}: Omit<PublicationTag, 'id'>): Promise<PublicationTag> => {
  const { rows } = await db.query<PublicationTag>({
    text: `
        INSERT INTO publication_tag (${COLUMNS}) 
        VALUES ($1, $2)
        RETURNING *`,
    values: [publication_id, tag_id],
  });

  return rows[0];
};

export const getListPublicationTegByPublicationId = async (
  publication_id: PublicationTag['publication_id'],
): Promise<PublicationTag[]> => {
  const { rows } = await db.query<PublicationTag>({
    text: `SELECT id, ${COLUMNS} FROM publication_tag WHERE publication_id = $1`,
    values: [publication_id],
  });

  return rows;
};

export const deletePublicationTegById = async (
  id: PublicationTag['id'],
): Promise<PublicationTag['id']> => {
  const { rows } = await db.query<PublicationTag>({
    text: `
        DELETE FROM publication_tag 
        WHERE id = $1 
        RETURNING *`,
    values: [id],
  });

  return rows[0].id;
};
