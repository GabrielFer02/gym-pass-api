/* eslint-disable @typescript-eslint/no-base-to-string */
import { randomUUID } from 'node:crypto';

import { type Gym, Prisma } from '@prisma/client';

import type { GymsRepository } from '@/repositories/gyms-repository.js';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find(item => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
