import { Injectable } from '@nestjs/common';

import { AuthProvider, Prisma } from '@prisma/client';

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
    authProvider: true,
    authProviderId: true,
    createdAt: true,
    updatedAt: true,
  } satisfies Prisma.UserSelect;

  private readonly authSelect = {
    id: true,
    email: true,
    passwordHash: true,
    role: true,
    authProvider: true,
    authProviderId: true,
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

  public findByProvider(provider: AuthProvider, providerId: string) {
    return this.prisma.user.findFirst({
      where: {
        authProvider: provider,
        authProviderId: providerId,
      },
      select: this.userSelect,
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

  public listNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        title: true,
        message: true,
        readAt: true,
        createdAt: true,
      },
    });
  }

  public async markNotificationRead(userId: string, notificationId: string) {
    const notification = await this.prisma.notification.findFirst({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      return null;
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { readAt: new Date() },
      select: {
        id: true,
        type: true,
        title: true,
        message: true,
        readAt: true,
        createdAt: true,
      },
    });
  }
}
