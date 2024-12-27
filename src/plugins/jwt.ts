import { FastifyJWTOptions } from '@fastify/jwt';
import { JWT_SECRET } from '../constants/env';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    id: number;
  }
}

export const jwtConfig: FastifyJWTOptions = {
  secret: JWT_SECRET,
  decoratorName: 'JWTUser',
  sign: { algorithm: 'HS256' },
  verify: { algorithms: ['HS256'] },
};
