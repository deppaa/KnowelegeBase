import { app } from '../../app';
import { disconnect } from '../../integrations/db/connection';

const fastify = app();

export const beforeTests = async () => {
  await fastify.ready();
};

export const afterTests = async () => {
  await disconnect();
  await fastify.close();
};
