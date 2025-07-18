import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app.js';
import { prisma } from '@/lib/prisma.js';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user.js';

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
