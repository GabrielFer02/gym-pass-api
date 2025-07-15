import type { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt.js';
import { verifyUserRole } from '@/http/middlewares/verify-user-role.js';

import { create } from './create.js';
import { nearby } from './nearby.js';
import { search } from './search.js';

export function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create);
}
