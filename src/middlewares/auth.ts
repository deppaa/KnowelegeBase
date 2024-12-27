import { FastifyReply, FastifyRequest } from 'fastify';
import { Roles } from '../utils/router';
import { ERRORS, HTTP_STATUS } from '../constants/message';
import passport from '@fastify/passport';
import { getUserById } from '../integrations/db/storage/user';
import { FastifyJWT } from '@fastify/jwt';

export const roles =
  (roles: Roles[]) => async (request: FastifyRequest, reply: FastifyReply) => {
    if (roles.length < 1) {
      return reply.code(HTTP_STATUS.INTERNAL_SERVER).send({
        error: ERRORS.BAD_ENDPOINT,
        message: 'Specify at least one role',
      });
    }

    const isNotAccessed = roles.includes('guest');

    const isAuthenticated = request.isAuthenticated();

    if (
      (isNotAccessed && isAuthenticated) ||
      (!isNotAccessed && !isAuthenticated)
    ) {
      const error = isAuthenticated
        ? ERRORS.ALREADY_LOGGED_IN
        : ERRORS.NEED_TO_LOGIN;

      return reply.code(HTTP_STATUS.UNAUTHORIZED).send({ error });
    }

    if (
      !isNotAccessed &&
      isAuthenticated &&
      !roles.includes(request.user!.role)
    ) {
      return reply
        .code(HTTP_STATUS.UNAUTHORIZED)
        .send({ error: ERRORS.PERMISSION_DENIED });
    }
  };

export const authWithEmail = passport.authenticate(
  'local',
  async (request, reply, error, user) => {
    if (error || !user) {
      return reply
        .code(HTTP_STATUS.UNAUTHORIZED)
        .send({ error: error || ERRORS.USER_NOT_EXIST });
    } else {
      await request.logIn(user, { session: false });
    }
  },
);

export const authWithJwt = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const tokenString = (request.headers['Authorization'] ??
    request.headers['authorization'] ??
    '') as string;

  if (tokenString) {
    try {
      const decoded = await request.jwtVerify<FastifyJWT>();
      const user = getUserById(decoded.id);
      await request.logIn(user, { session: false });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return reply
        .code(HTTP_STATUS.UNAUTHORIZED)
        .send({ error: ERRORS.INVALID_JWT_TOKEN });
    }
  }
};
