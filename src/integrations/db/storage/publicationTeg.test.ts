import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import {
  afterEachTest,
  afterTests,
  beforeTests,
} from '../../../utils/tests/db';
import {
  createPublicationTeg,
  deletePublicationTegById,
  getListPublicationTegByPublicationId,
} from './publicationTeg';
import { createTags } from './tags';
import { createPublication } from './publication';

beforeAll(beforeTests);
afterEach(afterEachTest);
afterAll(afterTests);

describe('Publication_tag', () => {
  test('createPublicationTeg works correctly', async () => {
    const [tag, publication] = await Promise.all([
      createTags('Title'),
      createPublication({
        title: 'Title',
        description: 'test desc',
        status: 'public',
      }),
    ]);

    const result = await createPublicationTeg({
      publication_id: publication.id,
      tag_id: tag.id,
    });

    expect(result).toEqual({
      id: expect.any(Number),
      publication_id: publication.id,
      tag_id: tag.id,
    });
  });

  test('getListPublicationTegByPublicationId works correctly', async () => {
    const [tag, publication] = await Promise.all([
      createTags('Title'),
      createPublication({
        title: 'Title',
        description: 'test desc',
        status: 'public',
      }),
    ]);

    const publication_tag = await createPublicationTeg({
      publication_id: publication.id,
      tag_id: tag.id,
    });

    const result = await getListPublicationTegByPublicationId(publication.id);

    expect(result).toEqual([
      {
        ...publication_tag,
        id: expect.any(Number),
      },
    ]);
  });

  test('deletePublicationTegById works correctly', async () => {
    const [tag, publication] = await Promise.all([
      createTags('Title'),
      createPublication({
        title: 'Title',
        description: 'test desc',
        status: 'public',
      }),
    ]);

    const publication_tag = await createPublicationTeg({
      publication_id: publication.id,
      tag_id: tag.id,
    });

    const result = await deletePublicationTegById(publication_tag.id);

    expect(result).toEqual(publication_tag.id);
  });
});
