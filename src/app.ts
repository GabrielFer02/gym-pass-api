import fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { env } from './env/env.js';
import { appRoutes } from './http/routes.js';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error: unknown, _: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error' });
});
