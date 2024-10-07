import Fastify from 'fastify';
import { routes } from './routes';

export const app = () => {
  const fastify = Fastify({ logger: true });

  routes(fastify);

  return fastify;
};
