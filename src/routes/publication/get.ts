import { Handler, PublicationIdGet } from 'src/_generated';
import { config } from '../../utils/router';
import { HTTP_STATUS, ERRORS } from '../../constants/message';
import { getPublicationById } from '../../integrations/db/storage/publication';
import { checkValidStringToNumber } from '../../utils/validation';

export const options = config({
  schema: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
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

export const handler: Handler<PublicationIdGet> = async (request, reply) => {
  const { id } = request.params;

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

  return reply.code(HTTP_STATUS.OK).send(publication);
};
