import { app } from './app';

const fastify = app();

fastify.listen({ host: 'localhost', port: 8000 }, async (error, address) => {
  console.log(`🚀 Server ready at: ${address}`);
});
