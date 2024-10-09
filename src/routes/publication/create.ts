import { Handler, PublicationPost } from 'src/_generated';
import { config } from '../../utils/router';
import { HTTP_STATUS, ERRORS } from '../../constants/message';
import { createPublication } from '../../integrations/db/storage/publication';
import { getListTags } from '../../integrations/db/storage/tags';
import { createPublicationTeg } from '../../integrations/db/storage/publicationTeg';

export const options = config({
  roles: ['user'],
  schema: {
    body: {
      type: 'object',
      required: ['title', 'description', 'status'],
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
      [HTTP_STATUS.CREATE]: {
        type: 'object',
        required: ['id', 'title', 'description', 'status'],
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

export const handler: Handler<PublicationPost> = async (request, reply) => {
  const { title, status, description, tagids } = request.body;

  if (tagids?.length) {
    const tags = await getListTags();
    const tagIdList = tags.map((tag) => tag.id);

    const tagExist = tagids.filter((id) => !tagIdList.includes(id));

    if (tagExist.length) {
      return reply
        .code(HTTP_STATUS.NOT_FOUND)
        .send({ error: ERRORS.TAG_IS_NOT_EXIST });
    }
  }

  const publication = await createPublication({
    title,
    description,
    status,
  });

  if (tagids?.length) {
    await Promise.all([
      tagids.map((id) =>
        createPublicationTeg({ publication_id: publication.id, tag_id: id }),
      ),
    ]);
  }

  return reply.code(HTTP_STATUS.CREATE).send({
    id: publication.id,
    title: publication.title,
    description: publication.description,
    status: publication.status,
    tagids: tagids?.length ? tagids : [],
  });
};
