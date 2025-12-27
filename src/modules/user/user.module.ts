import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { RolesGuard } from '@guards/roles.guard';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService, RolesGuard],
  exports: [UserService],
})
export class UserModule {}
