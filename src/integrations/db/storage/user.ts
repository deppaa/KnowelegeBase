import { User } from '@prisma/client';
import { prisma } from '../connection';

export const getUserByLogin = async (
  login: User['login'],
): Promise<User | null> => {
  const rows = await prisma.user.findFirst({
    where: {
      login,
    },
  });

  return rows;
};

export const getUserById = async (id: User['id']): Promise<User | null> => {
  const rows = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return rows;
};

export const getUserByLoginAndPassword = async ({
  login,
  password,
}: Pick<User, 'login' | 'password'>): Promise<User | null> => {
  const rows = await prisma.user.findFirst({
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
}: Omit<User, 'id'>): Promise<User> => {
  const rows = await prisma.user.create({
    data: { login, password, role },
  });

  return rows;
};

export const deleteUserById = async (id: User['id']): Promise<User['id']> => {
  const rows = await prisma.user.delete({
    where: {
      id,
    },
  });

  return rows.id;
};
