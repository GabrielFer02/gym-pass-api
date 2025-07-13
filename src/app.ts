import fastifyJwt from '@fastify/jwt';
import fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { env } from './env/env.js';
import { checkInsRoutes } from './http/controllers/check-ins/routes.js';
import { gymsRoutes } from './http/controllers/gyms/routes.js';
import { usersRoutes } from './http/controllers/users/routes.js';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler(
  (error: unknown, _: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error', issues: error.format() });
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error);
    }

    return reply.status(500).send({ message: 'Internal server error' });
  },
);
