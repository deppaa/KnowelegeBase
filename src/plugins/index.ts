import { FastifyInstance } from 'fastify';
import extractor from 'fastify-extract-definitions';

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
};
