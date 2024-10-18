import { Handler, PublicationGet } from 'src/_generated';
import { config } from '../../utils/router';
import { ERRORS, HTTP_STATUS } from '../../constants/message';
import { getListPublication } from '../../integrations/db/storage/publication';
import { checkValidStringToNumber } from '../../utils/validation';

export const options = config({
  roles: ['guest', 'user'],
  schema: {
    querystring: {
      type: 'object',
      properties: {
        tagIds: { type: 'array', items: { type: 'string' } },
      },
      additionalProperties: false,
    },
    response: {
      [HTTP_STATUS.OK]: {
        type: 'array',
        items: {
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
      },
    },
  },
});

export const handler: Handler<PublicationGet> = async (request, reply) => {
  const { tagIds } = request.query;

  if (tagIds?.length && !checkValidStringToNumber(tagIds)) {
    return reply
      .code(HTTP_STATUS.BAD_REQUEST)
      .send({ error: ERRORS.TAG_ID_IS_NOT_CORRECT });
  }

  const publications = await getListPublication({
    tagIds: tagIds?.length ? tagIds?.map((id) => Number(id)) : [],
    status: !request.user ? 'public' : undefined,
  });

  return reply.code(HTTP_STATUS.OK).send(publications);
};
