import cookie from '@fastify/cookie';
import { FastifyInstance } from 'fastify';
import extractor from 'fastify-extract-definitions';
import { extractorConfig } from './extractor';
import prismaPlugin from './prisma';
import passport from '@fastify/passport';
import session from '@fastify/session';
import { configureStrategies } from './passport';
import { sessionConfig } from './session';
import jwt from '@fastify/jwt';
import { jwtConfig } from './jwt';

export const plugins = (fastify: FastifyInstance) => {
  fastify.register(extractor, extractorConfig);

  fastify.register(cookie);

  fastify.register(prismaPlugin);

  fastify.register(jwt, jwtConfig);

  fastify.register(session, sessionConfig);

  fastify.register(passport.initialize());
  fastify.register(passport.secureSession());

  configureStrategies();
};
