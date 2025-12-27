import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { DatabaseService } from '@database/database.service';
import { PrismaRepository } from '@database/prisma/prisma.repository';

@Injectable()
export class UserRepository extends PrismaRepository {
  private readonly userSelect = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    avatarUrl: true,
    role: true,
    createdAt: true,
    updatedAt: true,
  } satisfies Prisma.UserSelect;

  constructor(databaseService: DatabaseService) {
    super(databaseService);
  }

  public findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: this.userSelect,
    });
  }

  public findByEmailForAuth(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        ...this.userSelect,
        passwordHash: true,
      },
    });
  }

  public findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
  }

  public create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
      select: this.userSelect,
    });
  }

  public updateById(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: this.userSelect,
    });
  }
}
