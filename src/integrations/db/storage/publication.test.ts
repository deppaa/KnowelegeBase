import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { Publication } from '@prisma/client';
import {
  afterEachTest,
  afterTests,
  beforeTests,
} from '../../../utils/tests/db';
import {
  createPublication,
  deletePublicationById,
  getListPublication,
  getPublicationById,
  updatePublicationById,
} from './publication';
import { createTags } from './tags';
import { createPublicationTeg } from './publicationTeg';

beforeAll(beforeTests);
afterEach(afterEachTest);
afterAll(afterTests);

const testData: Omit<Publication, 'id'> = {
  title: 'Title',
  description: 'desc',
  status: 'public',
};

const testData1: Omit<Publication, 'id'> = {
  title: 'Title1',
  description: 'desc',
  status: 'private',
};

describe('Publication', () => {
  test('createPublication works correctly', async () => {
    const result = await createPublication(testData);

    expect(result).toEqual({
      id: expect.any(Number),
      ...testData,
    });
  });

  test('getPublicationById works correctly', async () => {
    const publication = await createPublication(testData);

    const result = await getPublicationById(publication.id);

    expect(result).toEqual({
      ...publication,
      tagIds: [],
      id: expect.any(Number),
    });
  });

  test('getListPublication works correctly', async () => {
    const publication = await createPublication(testData);

    const result = await getListPublication({});

    expect(result).toEqual([
      {
        ...publication,
        tagIds: [],
        id: expect.any(Number),
      },
    ]);
  });

  test('getListPublication use status filter, works correctly', async () => {
    const [publication] = await Promise.all([
      createPublication(testData),
      createPublication(testData1),
    ]);

    const result = await getListPublication({
      status: 'public',
    });

    expect(result).toEqual([
      {
        ...publication,
        tagIds: [],
        id: expect.any(Number),
      },
    ]);
  });

  test('getListPublication use tagIds filter, works correctly', async () => {
    const [publication, publication1, tag, tag1] = await Promise.all([
      createPublication(testData),
      createPublication(testData1),
      createTags('Title'),
      createTags('Title1'),
    ]);

    await Promise.all([
      createPublicationTeg({
        publication_id: publication.id,
        tag_id: tag.id,
      }),
      createPublicationTeg({
        publication_id: publication1.id,
        tag_id: tag1.id,
      }),
    ]);

    const result = await getListPublication({
      tagIds: [tag.id],
    });

    expect(result).toEqual([
      {
        ...publication,
        tagIds: [tag.id],
        id: expect.any(Number),
      },
    ]);
  });

  test('updatePublicationById works correctly', async () => {
    const publication = await createPublication(testData);

    const result = await updatePublicationById({
      id: publication.id,
      title: 'test2',
      description: 'desc',
      status: 'public',
    });

    expect(result).toEqual({
      id: expect.any(Number),
      title: 'test2',
      description: 'desc',
      status: 'public',
    });
  });

  test('deletePublicationById works correctly', async () => {
    const publication = await createPublication(testData);

    const result = await deletePublicationById(publication.id);

    expect(result).toEqual(publication.id);
  });
});
