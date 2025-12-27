import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { User } from '@prisma/client';

import { AuthDto } from './dto/auth.dto';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async login(req: Request, { email, password }: AuthDto) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new InternalServerErrorException('Invalid credentials');
    }

    //assign user id to session from request
    req.session.user_id = user.id;
    delete (user as Partial<User>).passwordHash;

    //save session
    await this.saveSession(req, user);
    return user;
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

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmailForAuth(email);
    if (!user) {
      return null;
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return null;
    }

    return user;
  }

  private async saveSession(req: Request, user: Omit<User, 'passwordHash'>) {
    return new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          reject(new InternalServerErrorException('Failed to save session.'));
        } else {
          resolve({ user });
        }
      });
    });
  }
}
