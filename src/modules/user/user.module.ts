import { Module } from '@nestjs/common';

import { RolesGuard } from '@guards/roles.guard';
import { SessionAuthGuard } from '@guards/session-auth.guard';
import { UserService } from './user.service';
import { MeController } from './me.controller';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [UserController, MeController],
  providers: [UserRepository, UserService, RolesGuard, SessionAuthGuard],
  exports: [UserService],
})
export class UserModule {}
