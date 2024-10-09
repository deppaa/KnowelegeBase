import { Handler, PublicationIdDelete } from 'src/_generated';
import { config } from '../../utils/router';
import { ERRORS, HTTP_STATUS } from '../../constants/message';
import { checkValidStringToNumber } from '../../utils/validation';
import {
  deletePublicationById,
  getPublicationById,
} from '../../integrations/db/storage/publication';

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
    response: {
      [HTTP_STATUS.OK]: {
        type: 'object',
        properties: {
          id: { type: 'number' },
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

export const handler: Handler<PublicationIdDelete> = async (request, reply) => {
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

  const result = await deletePublicationById(Number(id));

  return reply.code(HTTP_STATUS.OK).send({ id: result });
};
