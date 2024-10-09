import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import extractor from 'fastify-extract-definitions';
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

export const plugins = (fastify: FastifyInstance) => {
  fastify.register(extractor, {
    enabled: process.env.PUBLIC_ENV === 'local',
    ignoreHead: true,
    outputs: {
      './src/_generated.ts': {
        target: 'serverTypes',
      },
    },
  });

  fastify.register(cookie);

  fastify.register(jwt, {
    secret: JWT_SECRET,
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });
};
