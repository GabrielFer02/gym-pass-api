import { type FastifyInstance } from 'fastify';

import { authenticate } from './controllers/authenticate.js';
import { profile } from './controllers/profile.js';
import { register } from './controllers/register.js';
import { verifyJwt } from './middlewares/verify-jwt.js';

export function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
