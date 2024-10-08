import { db } from '../connection';
import { Publication } from './types';

const COLUMNS = ['title', 'description', 'status'];

export const getPublicationById = async (
  id: Publication['id'],
): Promise<Publication | undefined> => {
  const { rows } = await db.query<Publication>({
    text: `
        SELECT 
            p.id AS id,
            p.title AS title,
            p.description AS description,
            p.status AS status,
            ARRAY_AGG(t.id) AS tagids
        FROM 
            publication p
        LEFT JOIN 
            publication_tag pt ON p.id = pt.publication_id
        LEFT JOIN 
            tags t ON pt.tag_id = t.id
        WHERE p.id = $1
        GROUP BY 
            p.id, p.title, p.description, p.status`,
    values: [id],
  });

  return rows[0];
};

export const getListPublication = async (): Promise<Publication[]> => {
  const { rows } = await db.query<Publication>({
    text: `
        SELECT 
            p.id AS id,
            p.title AS title,
            p.description AS description,
            p.status AS status,
            ARRAY_AGG(t.id) AS tagids
        FROM 
            publication p
        LEFT JOIN 
            publication_tag pt ON p.id = pt.publication_id
        LEFT JOIN 
            tags t ON pt.tag_id = t.id
        GROUP BY 
            p.id, p.title, p.description, p.status`,
    values: [],
  });

  return rows;
};

export const updatePublicationById = async ({
  id,
  title,
  description,
  status,
}: Omit<Publication, 'tagids'>): Promise<Publication> => {
  const { rows } = await db.query<Publication>({
    text: `
        UPDATE publication
        SET title = $2, description = $3, status = $4
        WHERE id = $1
        RETURNING *`,
    values: [id, title, description, status],
  });

  return rows[0];
};

export const createPublication = async ({
  title,
  description,
  status,
}: Omit<Publication, 'id' | 'tagids'>): Promise<Publication> => {
  const { rows } = await db.query<Publication>({
    text: `
        INSERT INTO publication (${COLUMNS}) 
        VALUES ($1, $2, $3)
        RETURNING *`,
    values: [title, description, status],
  });

  return rows[0];
};

export const deletePublicationById = async (
  id: Publication['id'],
): Promise<Publication['id']> => {
  const { rows } = await db.query<Publication>({
    text: `
        DELETE FROM publication 
        WHERE id = $1 
        RETURNING *`,
    values: [id],
  });

  return rows[0].id;
};
