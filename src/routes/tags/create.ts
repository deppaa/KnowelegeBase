import { createTags } from '../../integrations/db/storage/tags';
import { Handler, TagsPost } from '../../_generated';
import { HTTP_STATUS } from '../../constants/message';
import { config } from '../../utils/router';

export const options = config({
  schema: {
    body: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
      },
      additionalProperties: false,
    },
    response: {
      [HTTP_STATUS.CREATE]: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
  },
});

export const handler: Handler<TagsPost> = async (request, reply) => {
  const { title } = request.body;

  const tag = await createTags(title);

  return reply.code(HTTP_STATUS.CREATE).send(tag);
};
