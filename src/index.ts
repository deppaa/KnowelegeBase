import './plugins/env';
import { app } from './app';

const fastify = app();

fastify.listen({ host: 'localhost', port: 8000 }, async (error, address) => {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }

  console.log(`🚀 Server ready at: ${address}`);
});
