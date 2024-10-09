import { Handler, PublicationIdPut } from 'src/_generated';
import { config } from '../../utils/router';
import { ERRORS, HTTP_STATUS } from '../../constants/message';
import {
  getPublicationById,
  updatePublicationById,
} from '../../integrations/db/storage/publication';
import { checkValidStringToNumber } from '../../utils/validation';
import { Publication, Tags } from '../../integrations/db/storage/types';
import { getListTags } from '../../integrations/db/storage/tags';
import {
  createPublicationTeg,
  deletePublicationTegById,
  getListPublicationTegByPublicationId,
} from '../../integrations/db/storage/publicationTeg';

export const options = config({
  roles: ['user'],
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
      additionalProperties: false,
    },
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string', enum: ['public', 'private'] },
        tagids: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
      additionalProperties: false,
    },
    response: {
      [HTTP_STATUS.OK]: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string', enum: ['public', 'private'] },
          tagids: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
        },
        additionalProperties: false,
      },
      [HTTP_STATUS.BAD_REQUEST]: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
        additionalProperties: false,
      },
      [HTTP_STATUS.NOT_FOUND]: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
  },
});

const updateTagsForPublication = async ({
  id,
  tagsIds,
}: {
  id: Publication['id'];
  tagsIds: Tags['id'][];
}) => {
  const tags = await getListTags();
  const tagIdList = tags.map((tag) => tag.id);

  const tagExist = tagsIds.filter((id) => !tagIdList.includes(id));

  if (tagExist.length) {
    return { status: false, error: ERRORS.TAG_IS_NOT_EXIST };
  }

  const oldTags = await getListPublicationTegByPublicationId(id);

  await Promise.all([oldTags.map((item) => deletePublicationTegById(item.id))]);

  await Promise.all([
    tagsIds.map((tag_id) =>
      createPublicationTeg({ publication_id: id, tag_id: tag_id }),
    ),
  ]);

  return { status: true };
};

export const handler: Handler<PublicationIdPut> = async (request, reply) => {
  const { id } = request.params;
  const { title, description, status, tagids } = request.body;

  if (!checkValidStringToNumber(id)) {
    return reply
      .code(HTTP_STATUS.BAD_REQUEST)
      .send({ error: ERRORS.PUBLICATION_ID_IS_NOT_CORRECT });
  }

  const publication = await getPublicationById(Number(id));

  if (!publication) {
    return reply
      .code(HTTP_STATUS.NOT_FOUND)
      .send({ error: ERRORS.PUBLICATION_NOT_FOUND });
  }

  if (tagids?.length) {
    const result = await updateTagsForPublication({
      id: publication.id,
      tagsIds: tagids,
    });

    if (!result.status) {
      return reply.code(HTTP_STATUS.NOT_FOUND).send({ error: result.error });
    }
  }

  const result = await updatePublicationById({
    id: publication.id,
    title: title ?? publication.title,
    description: description ?? publication.description,
    status: status ?? publication.status,
  });

  return reply
    .code(HTTP_STATUS.OK)
    .send({ ...result, tagids: tagids?.length ? tagids : publication.tagids });
};
