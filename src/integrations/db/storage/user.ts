import { Accaunt } from '@prisma/client';
import { prisma } from '../connection';

export const getUserByLogin = async (
  login: Accaunt['login'],
): Promise<Accaunt | null> => {
  const rows = await prisma.accaunt.findFirst({
    where: {
      login,
    },
  });

  return rows;
};

export const getUserById = async (
  id: Accaunt['id'],
): Promise<Accaunt | null> => {
  const rows = await prisma.accaunt.findFirst({
    where: {
      id,
    },
  });

  return rows;
};

export const getUserByLoginAndPassword = async ({
  login,
  password,
}: Pick<Accaunt, 'login' | 'password'>): Promise<Accaunt | null> => {
  const rows = await prisma.accaunt.findFirst({
    where: {
      login,
      password,
    },
  });

  return rows;
};

export const createUser = async ({
  login,
  password,
  role,
}: Omit<Accaunt, 'id'>): Promise<Accaunt> => {
  const rows = await prisma.accaunt.create({
    data: { login, password, role },
  });

  return rows;
};

export const deleteUserById = async (
  id: Accaunt['id'],
): Promise<Accaunt['id']> => {
  const rows = await prisma.accaunt.delete({
    where: {
      id,
    },
  });

  return rows.id;
};
