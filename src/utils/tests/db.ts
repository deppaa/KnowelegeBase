import { backup } from '../../integrations/db/connection';
import { app } from '../../app';

const fastify = app();

export const beforeTests = async () => {
  await fastify.ready();
};

export const afterTests = async () => {
  await fastify.close();
};

export const afterEachTest = async () => {
  await backup();
};
