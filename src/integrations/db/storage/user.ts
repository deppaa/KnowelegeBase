import { User } from '@prisma/client';
import { prisma } from '../connection';

export const getUserByLogin = async (
  email: User['email'],
): Promise<User | null> => {
  const rows = await prisma.user.findFirst({
    where: {
      email,
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
  email,
  password,
}: Pick<User, 'email' | 'password'>): Promise<User | null> => {
  const rows = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  return rows;
};

export const createUser = async ({
  email,
  password,
  role,
}: Omit<User, 'id'>): Promise<User> => {
  const rows = await prisma.user.create({
    data: { email, password, role },
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
