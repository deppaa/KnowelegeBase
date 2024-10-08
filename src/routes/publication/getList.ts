import { Handler, PublicationGet } from 'src/_generated';
import { config } from '../../utils/router';
import { HTTP_STATUS } from '../../constants/message';
import { getListPublication } from '../../integrations/db/storage/publication';

export const options = config({
  schema: {
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
      },
    },
  },
});

export const handler: Handler<PublicationGet> = async (request, reply) => {
  const publications = await getListPublication();

  return reply.code(HTTP_STATUS.OK).send(publications);
};
