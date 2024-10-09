import { Handler, SigninPost } from 'src/_generated';
import { config } from '../../utils/router';
import { ERRORS, HTTP_STATUS } from '../../constants/message';
import { getUserByLoginAndPassword } from '../../integrations/db/storage/user';
import { createHash } from '../../utils/auth';

export const options = config({
  roles: ['guest', 'user'],
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
      additionalProperties: false,
    },
    response: {
      [HTTP_STATUS.OK]: {
        type: 'object',
        properties: {
          login: { type: 'string' },
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
});

export const handler: Handler<SigninPost> = async (request, reply) => {
  const { login, password } = request.body;

  const hash = createHash(password);

  const user = await getUserByLoginAndPassword({ login, password: hash });

  if (!user) {
    return reply
      .code(HTTP_STATUS.BAD_REQUEST)
      .send({ error: ERRORS.USER_NOT_EXIST });
  }

  const token = await reply.jwtSign({
    login,
  });

  return reply
    .setCookie('token', token)
    .code(HTTP_STATUS.OK)
    .send({ login: user.login });
};
