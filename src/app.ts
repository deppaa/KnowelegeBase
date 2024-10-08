import Fastify from 'fastify';
import { routes } from './routes';
import { plugins } from './plugins';

export const app = () => {
  const fastify = Fastify({ logger: true });

  plugins(fastify);
  routes(fastify);

  return fastify;
};
