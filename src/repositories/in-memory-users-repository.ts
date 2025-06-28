import { Prisma } from '@prisma/client'

export class InMemoryUsersRepository {
  public users: any = []

   create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}