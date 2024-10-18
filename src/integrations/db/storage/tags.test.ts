import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { Tags } from '@prisma/client';
import {
  afterEachTest,
  afterTests,
  beforeTests,
} from '../../../utils/tests/db';
import {
  createTags,
  deleteTagsById,
  getListTags,
  getTagsById,
  updateTagsById,
} from './tags';

beforeAll(beforeTests);
afterEach(afterEachTest);
afterAll(afterTests);

const testData: Omit<Tags, 'id'> = {
  title: 'test',
};

describe('Tags', () => {
  test('createTags works correctly', async () => {
    const result = await createTags(testData['title']);

    expect(result).toEqual({
      id: expect.any(Number),
      ...testData,
    });
  });

  test('getTagsById works correctly', async () => {
    const tag = await createTags(testData['title']);

    const result = await getTagsById(tag.id);

    expect(result).toEqual({
      ...tag,
      id: expect.any(Number),
    });
  });

  test('getListTags works correctly', async () => {
    const tag = await createTags(testData['title']);

    const result = await getListTags();

    expect(result).toEqual([
      {
        ...tag,
        id: expect.any(Number),
      },
    ]);
  });

  test('updateTagsById works correctly', async () => {
    const tag = await createTags(testData['title']);

    const result = await updateTagsById({ id: tag.id, title: 'test2' });

    expect(result).toEqual({
      id: expect.any(Number),
      title: 'test2',
    });
  });

  test('deleteTagsById works correctly', async () => {
    const tag = await createTags(testData['title']);

    const result = await deleteTagsById(tag.id);

    expect(result).toEqual(tag.id);
  });
});
