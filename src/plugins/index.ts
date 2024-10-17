import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import extractor from 'fastify-extract-definitions';
import { jwtConfig } from './jwt';
import { extractorConfig } from './extractor';
import prismaPlugin from './prisma';

export const plugins = (fastify: FastifyInstance) => {
  fastify.register(extractor, extractorConfig);

  fastify.register(cookie);

  fastify.register(jwt, jwtConfig);

  fastify.register(prismaPlugin);
};
