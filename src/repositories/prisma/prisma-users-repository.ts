import { Prisma, type User } from '@prisma/client';

import { prisma } from '@/lib/prisma.js';

import type { UsersRepository } from '../users-repository.js';

export class PrismaUsersRepository implements UsersRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
