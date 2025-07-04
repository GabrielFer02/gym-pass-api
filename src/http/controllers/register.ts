import { type FastifyReply, type FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case.js';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ email, name, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
