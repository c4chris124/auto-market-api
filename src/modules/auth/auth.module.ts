import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@modules/user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Module({
  imports: [UserModule, PassportModule.register({ session: false })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GoogleAuthGuard],
})
export class AuthModule {}
