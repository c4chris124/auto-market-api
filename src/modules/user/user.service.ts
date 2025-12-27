import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import bcrypt from 'bcrypt';
import { AuthProvider, Role } from '@prisma/client';

import { UserRepository } from './repositories/user.repository';
import { CreateUserDto, UpdateProfileDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  public async findUserByEmailForAuth(email: string) {
    return this.userRepository.findByEmailForAuth(email);
  }

  public async findUserByProvider(provider: AuthProvider, providerId: string) {
    return this.userRepository.findByProvider(provider, providerId);
  }

  public async createUser(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await this.hashPassword(dto.password);
    return this.userRepository.create({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      avatarUrl: dto.avatarUrl,
      role: dto.role,
    });
  }

  public async createUserFromOAuth({
    email,
    firstName,
    lastName,
    avatarUrl,
    provider,
    providerId,
  }: {
    email: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    provider: AuthProvider;
    providerId: string;
  }) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return this.userRepository.updateById(existingUser.id, {
        authProvider: provider,
        authProviderId: providerId,
      });
    }

    return this.userRepository.create({
      email,
      passwordHash: null,
      firstName,
      lastName,
      avatarUrl,
      authProvider: provider,
      authProviderId: providerId,
      role: Role.USER,
    });
  }

  public async updateUser(userId: string, dto: UpdateUserDto) {
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const passwordHash = dto.password
      ? await this.hashPassword(dto.password)
      : undefined;

    return this.userRepository.updateById(userId, {
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      avatarUrl: dto.avatarUrl,
      role: dto.role,
    });
  }

  public async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  public async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.updateById(userId, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      avatarUrl: dto.avatarUrl,
    });
  }

  public async getNotifications(userId: string) {
    return this.userRepository.listNotifications(userId);
  }

  public async markNotificationRead(userId: string, notificationId: string) {
    const notification = await this.userRepository.markNotificationRead(
      userId,
      notificationId,
    );

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return notification;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
