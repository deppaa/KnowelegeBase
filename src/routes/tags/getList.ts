import { getListTags } from '../../integrations/db/storage/tags';
import { Handler, TagsGet } from '../../_generated';
import { HTTP_STATUS } from '../../constants/message';
import { config } from '../../utils/router';

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
          },
          additionalProperties: false,
        },
      },
    },
  },
});

export const handler: Handler<TagsGet> = async (request, reply) => {
  const tags = await getListTags();

  return reply.code(HTTP_STATUS.OK).send(tags);
};
