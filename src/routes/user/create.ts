import { Handler, RegistrationPost } from 'src/_generated';
import { config } from '../../utils/router';
import { ERRORS, HTTP_STATUS } from '../../constants/message';
import { createUser, getUserByLogin } from '../../integrations/db/storage/user';
import { createHash } from '../../utils/auth';

export const options = config({
  roles: ['guest'],
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
      [HTTP_STATUS.CREATE]: {
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

export const handler: Handler<RegistrationPost> = async (request, reply) => {
  const { login, password } = request.body;

  const user = await getUserByLogin(login);

  if (user) {
    return reply
      .code(HTTP_STATUS.BAD_REQUEST)
      .send({ error: ERRORS.USER_EXIST });
  }

  const hash = createHash(password);

  const result = await createUser({
    login,
    password: hash,
    role: 'user',
  });

  return reply.code(HTTP_STATUS.CREATE).send({ login: result.login });
};
