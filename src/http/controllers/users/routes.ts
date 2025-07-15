import { type FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt.js';

import { authenticate } from './authenticate.js';
import { profile } from './profile.js';
import { refresh } from './refresh.js';
import { register } from './register.js';

export function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
