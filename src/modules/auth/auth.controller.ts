import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import type { Request } from 'express';

import { AuthService } from './auth.service';
import { AuthDto, SignUpDto, SocialSignInDto } from './dto/auth.dto';

@ApiTags('Auth')
@ApiCookieAuth()
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  signIn(@Req() req: Request, @Body() authDto: AuthDto) {
    return this.authService.login(req, authDto);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Sign up with email and password' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  signUp(@Req() req: Request, @Body() dto: SignUpDto) {
    return this.authService.signUp(req, dto);
  }

  @Post('social')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in with Google or Apple' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  socialSignIn(@Req() req: Request, @Body() dto: SocialSignInDto) {
    return this.authService.socialSignIn(req, dto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign out user' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  signOut(@Req() req: Request) {
    return this.authService.logOut(req);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user (legacy)' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Req() req: Request, @Body() authDto: AuthDto) {
    return this.authService.login(req, authDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user (legacy)' })
  @ApiResponse({ status: 200, description: 'User logged out successfully' })
  logout(@Req() req: Request) {
    return this.authService.logOut(req);
  }
}
