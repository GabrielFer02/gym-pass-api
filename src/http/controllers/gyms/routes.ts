import type { FastifyInstance } from 'fastify';

import { verifyJwt } from '@/http/middlewares/verify-jwt.js';

export function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);
}
