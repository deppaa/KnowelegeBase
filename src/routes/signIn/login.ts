import { Handler, SigninPost } from 'src/_generated';
import { config } from '../../utils/router';
import { HTTP_STATUS } from '../../constants/message';
import { authWithEmail } from '../../middlewares/auth';

export const options = config({
  roles: ['guest', 'user'],
  schema: {
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      additionalProperties: false,
    },
    response: {
      [HTTP_STATUS.OK]: {
        type: 'object',
        properties: {
          token: { type: 'string' },
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
  preHandler: [authWithEmail],
});

export const handler: Handler<SigninPost> = async (request, reply) => {
  const token = await reply.jwtSign({ id: request.user?.id });

  return reply.code(HTTP_STATUS.OK).send({
    token,
  });
};
