import { FastifyInstance, HTTPMethods, RouteShorthandOptions } from 'fastify';
import { Handler } from '../_generated';

type Routes = Record<
  string,
  Partial<
    Record<
      HTTPMethods,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { options: RouteShorthandOptions; handler: Handler<any> }
    >
  >
>;

export const router = (routes: Routes) => (fastify: FastifyInstance) =>
  fastify.register(async (fastify) => {
    Object.entries(routes).forEach(([url, config]) => {
      Object.entries(config).forEach(([_method, { options, handler }]) => {
        const method = _method as HTTPMethods;

        fastify.route({
          ...options,
          method,
          url,
          handler,
        });
      });
    });
  });

export const config = ({
  preHandler = [],
  schema,
}: RouteShorthandOptions): RouteShorthandOptions => {
  return {
    schema,
    preHandler,
  };
};
