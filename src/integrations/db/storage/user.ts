import { db } from '../connection';
import { Accaunt } from './types';

const COLUMNS = ['login', 'password', 'role'].join(', ');

export const getUserByLogin = async (
  login: Accaunt['login'],
): Promise<Accaunt | undefined> => {
  const { rows } = await db.query<Accaunt>({
    text: `SELECT id, ${COLUMNS} FROM accaunt WHERE login = $1`,
    values: [login],
  });

  return rows[0];
};

export const getUserById = async (
  id: Accaunt['id'],
): Promise<Accaunt | undefined> => {
  const { rows } = await db.query<Accaunt>({
    text: `SELECT id, ${COLUMNS} FROM accaunt WHERE id = $1`,
    values: [id],
  });

  return rows[0];
};

export const getUserByLoginAndPassword = async ({
  login,
  password,
}: Pick<Accaunt, 'login' | 'password'>): Promise<Accaunt | undefined> => {
  const { rows } = await db.query<Accaunt>({
    text: `SELECT id, ${COLUMNS} FROM accaunt WHERE login = $1 AND password = $2`,
    values: [login, password],
  });

  return rows[0];
};

export const createUser = async ({
  login,
  password,
  role,
}: Omit<Accaunt, 'id'>): Promise<Accaunt> => {
  const { rows } = await db.query<Accaunt>({
    text: `
        INSERT INTO accaunt (${COLUMNS}) 
        VALUES ($1, $2, $3)
        RETURNING *`,
    values: [login, password, role],
  });

  return rows[0];
};

export const deleteUserById = async (
  id: Accaunt['id'],
): Promise<Accaunt['id']> => {
  const { rows } = await db.query<Accaunt>({
    text: `
        DELETE FROM accaunt 
        WHERE id = $1 
        RETURNING *`,
    values: [id],
  });

  return rows[0].id;
};
