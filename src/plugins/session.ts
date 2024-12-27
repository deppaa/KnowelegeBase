import { FastifySessionOptions } from '@fastify/session';
import { SESSION_SECRET } from '../constants/env';

export const sessionConfig: FastifySessionOptions = {
  secret: SESSION_SECRET,
};
