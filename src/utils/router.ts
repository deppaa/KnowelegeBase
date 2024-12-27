/* eslint-disable indent */
import { FastifyInstance, HTTPMethods, RouteShorthandOptions } from 'fastify';
import { Handler } from '../_generated';
import { HTTP_STATUS } from '../constants/message';
import { roles as rolesMiddleware } from '../middlewares/auth';

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

export type Roles = 'guest' | 'user';

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
  roles,
  preHandler = [],
  schema,
}: RouteShorthandOptions & {
  roles: Roles[];
}): RouteShorthandOptions => {
  const authOnly = roles.includes('guest');

  const unauthorized = {
    [HTTP_STATUS.UNAUTHORIZED]: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
      additionalProperties: false,
    },
  };

  const response =
    schema?.response || authOnly
      ? {
          ...(schema?.response ?? {}),
          ...(authOnly ? unauthorized : {}),
        }
      : undefined;

  return {
    schema: {
      ...schema,
      ...(response ? { response } : undefined),
    },
    preHandler: [
      rolesMiddleware(roles),
      ...(Array.isArray(preHandler) ? preHandler : [preHandler]),
    ],
  };
};
