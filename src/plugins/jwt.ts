import { FastifyJWTOptions } from '@fastify/jwt';
import { JWT_SECRET } from '../constants/env';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { login: string };
    user: {
      id: number;
      login: string;
      role: string;
    };
  }
}

export const jwtConfig: FastifyJWTOptions = {
  secret: JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
};
