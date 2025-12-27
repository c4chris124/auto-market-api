import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { AuthProvider, User } from '@prisma/client';

import { UserService } from '@modules/user/user.service';
import { SessionUser } from '@common/types/session-user.type';
import { AuthDto, SignUpDto, SocialSignInDto } from './dto/auth.dto';
import { GoogleProfile } from './strategies/google.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async login(req: Request, { email, password }: AuthDto) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const sessionUser = this.toSessionUser(user);
    req.session.user = sessionUser;

    await this.saveSession(req);
    return sessionUser;
  }

  public async logOut(req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(
            new InternalServerErrorException('Failed to destroy session.'),
          );
        } else {
          resolve({ message: 'Logged out successfully' });
        }
      });
    });
  }

  public async signUp(req: Request, dto: SignUpDto) {
    const existingUser = await this.userService.findUserByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const user = await this.userService.createUser({
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      avatarUrl: dto.avatarUrl,
    });

    const sessionUser = this.toSessionUser(user);
    req.session.user = sessionUser;
    await this.saveSession(req);
    return sessionUser;
  }

  public async socialSignIn(req: Request, dto: SocialSignInDto) {
    if (
      dto.provider !== AuthProvider.GOOGLE &&
      dto.provider !== AuthProvider.APPLE
    ) {
      throw new UnauthorizedException('Unsupported provider');
    }

    const existingByProvider = await this.userService.findUserByProvider(
      dto.provider,
      dto.providerId,
    );

    const user = existingByProvider
      ? existingByProvider
      : await this.userService.createUserFromOAuth({
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          avatarUrl: dto.avatarUrl,
          provider: dto.provider,
          providerId: dto.providerId,
        });

    const sessionUser = this.toSessionUser(user);
    req.session.user = sessionUser;
    await this.saveSession(req);
    return sessionUser;
  }

  public async googleSignIn(req: Request, profile: GoogleProfile) {
    if (!profile?.providerId || !profile?.email) {
      throw new UnauthorizedException('Invalid Google profile');
    }

    const existingByProvider = await this.userService.findUserByProvider(
      AuthProvider.GOOGLE,
      profile.providerId,
    );

    const user = existingByProvider
      ? existingByProvider
      : await this.userService.createUserFromOAuth({
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          avatarUrl: profile.avatarUrl,
          provider: AuthProvider.GOOGLE,
          providerId: profile.providerId,
        });

    const sessionUser = this.toSessionUser(user);
    req.session.user = sessionUser;
    await this.saveSession(req);
    return sessionUser;
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmailForAuth(email);
    if (!user) {
      return null;
    }

    if (!user.passwordHash) {
      return null;
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return null;
    }

    return user;
  }

  private toSessionUser(
    user: Pick<User, 'id' | 'email' | 'role'>,
  ): SessionUser {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  private async saveSession(req: Request) {
    return new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          reject(new InternalServerErrorException('Failed to save session.'));
        } else {
          resolve({ ok: true });
        }
      });
    });
  }
}
