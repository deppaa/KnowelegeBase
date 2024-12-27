import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import {
  createUser,
  getUserById,
  getUserByLogin,
  getUserByLoginAndPassword,
} from './user';
import { User } from '@prisma/client';
import {
  afterEachTest,
  afterTests,
  beforeTests,
} from '../../../utils/tests/db';

beforeAll(beforeTests);
afterEach(afterEachTest);
afterAll(afterTests);

const testData: Omit<User, 'id'> = {
  email: 'test',
  password: 'test',
  role: 'user',
};

describe('user', () => {
  test('createUser works correctly', async () => {
    const result = await createUser(testData);

    expect(result).toEqual({
      id: expect.any(Number),
      ...testData,
    });
  });

  test('getUserByLogin works correctly', async () => {
    const user = await createUser(testData);

    const result = await getUserByLogin(user.email);

    expect(result).toEqual({
      ...user,
      id: expect.any(Number),
    });
  });

  test('getUserByLoginAndPassword works correctly', async () => {
    const user = await createUser(testData);

    const result = await getUserByLoginAndPassword({
      email: user.email,
      password: user.password,
    });

    expect(result).toEqual({
      ...user,
      id: expect.any(Number),
    });
  });

  test('getUserById works correctly', async () => {
    const user = await createUser(testData);

    const result = await getUserById(user.id);

    expect(result).toEqual({
      ...user,
      id: expect.any(Number),
    });
  });
});
