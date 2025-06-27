import 'dotenv/config';

import zod from 'zod';

const envSchema = zod.object({
  NODE_ENV: zod.enum(['dev', 'test', 'production']).default('dev'),
  PORT: zod.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
