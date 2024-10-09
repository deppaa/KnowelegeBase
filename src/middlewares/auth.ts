import { FastifyReply, FastifyRequest } from 'fastify';
import { Roles } from '../utils/router';
import { ERRORS, HTTP_STATUS } from '../constants/message';
import { getUserByLogin } from '../integrations/db/storage/user';

export const isAuthenticate =
  (roles: Roles[]) => async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const auth = await request.jwtVerify<{ login: string; iat: number }>();

      const user = await getUserByLogin(auth.login);

      if (!user) {
        return reply
          .code(HTTP_STATUS.BAD_REQUEST)
          .send({ error: ERRORS.USER_NOT_EXIST });
      }

      const isAccssecc = roles.includes(user.role);

      if (!isAccssecc) {
        return reply
          .code(HTTP_STATUS.FORBIDDEN)
          .send({ error: ERRORS.FORBIDDEN });
      }

      request.user = { login: user.login, id: user.id, role: user.role };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      const isAuthenticated = !roles.includes('guest');

      if (isAuthenticated) {
        return reply
          .code(HTTP_STATUS.UNAUTHORIZED)
          .send({ error: ERRORS.NEED_TO_LOGIN });
      }
    }
  };
