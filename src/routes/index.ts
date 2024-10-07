import { FastifyInstance, HTTPMethods } from 'fastify';
import * as test from './test';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Routes = Record<string, Partial<Record<HTTPMethods, any>>>;

const router = (routes: Routes) => (fastify: FastifyInstance) =>
  fastify.register(async (fastify) => {
    Object.entries(routes).forEach(([url, config]) => {
      Object.entries(config).forEach(([_method, { handler }]) => {
        const method = _method as HTTPMethods;

        fastify.route({
          method,
          url,
          handler,
        });
      });
    });
  });

export const routes = router({
  '/': {
    GET: test.get,
  },
  '/test': {
    GET: test.get,
  },
});
