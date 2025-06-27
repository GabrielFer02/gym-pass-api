import { type FastifyInstance } from 'fastify';

import { register } from './controllers/register.js';

export function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
}
