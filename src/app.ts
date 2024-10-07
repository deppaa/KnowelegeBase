import Fastify from 'fastify';
import { routes } from './routes';

export const app = () => {
  const fastify = Fastify();

  routes(fastify);

  return fastify;
};
