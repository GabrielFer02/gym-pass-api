import { type FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt.js';

import { authenticate } from './authenticate.js';
import { profile } from './profile.js';
import { register } from './register.js';

export function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
