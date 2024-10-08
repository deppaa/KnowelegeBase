import { db } from '../connection';
import { Tags } from './types';

const COLUMNS = ['title'];

export const getTagsById = async (
  id: Tags['id'],
): Promise<Tags | undefined> => {
  const { rows } = await db.query<Tags>({
    text: `SELECT id, ${COLUMNS} FROM tags WHERE id = $1`,
    values: [id],
  });

  return rows[0];
};

export const getListTags = async (): Promise<Tags[]> => {
  const { rows } = await db.query<Tags>({
    text: `SELECT id, ${COLUMNS} FROM tags`,
    values: [],
  });

  return rows;
};

export const updateTagsById = async ({ id, title }: Tags): Promise<Tags> => {
  const { rows } = await db.query<Tags>({
    text: `
        UPDATE tags
        SET title = $2
        WHERE id = $1
        RETURNING *`,
    values: [id, title],
  });

  return rows[0];
};

export const createTags = async (title: Tags['title']): Promise<Tags> => {
  const { rows } = await db.query<Tags>({
    text: `
        INSERT INTO tags (${COLUMNS}) 
        VALUES ($1)
        RETURNING *`,
    values: [title],
  });

  return rows[0];
};

export const deleteTagsById = async (id: Tags['id']): Promise<Tags['id']> => {
  const { rows } = await db.query<Tags>({
    text: `
        DELETE FROM tags 
        WHERE id = $1 
        RETURNING *`,
    values: [id],
  });

  return rows[0].id;
};
