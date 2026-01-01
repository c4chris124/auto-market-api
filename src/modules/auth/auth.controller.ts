import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { AuthDto, EmailLookupDto, SignUpDto, SocialSignInDto } from './dto/auth.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleProfile } from './strategies/google.strategy';

type GoogleAuthRequest = Request & { user: GoogleProfile };

@ApiTags('Auth')
@ApiCookieAuth()
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private getFrontendRedirectUrl(): string {
    return (
      this.configService.get<string>('FRONTEND_URL') ?? 'http://localhost:5173'
    );
  }

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

  @Post('identify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Identify account by email' })
  @ApiResponse({ status: 200, description: 'Account lookup response' })
  identifyAccount(@Body() dto: EmailLookupDto) {
    return this.authService.identifyAccount(dto.email);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Start Google OAuth flow' })
  googleAuth() {
    return { message: 'Redirecting to Google' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleCallback(@Req() req: GoogleAuthRequest, @Res() res: Response) {
    await this.authService.googleSignIn(req, req.user);
    return res.redirect(this.getFrontendRedirectUrl());
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google OAuth redirect (alias)' })
  async googleRedirect(@Req() req: GoogleAuthRequest, @Res() res: Response) {
    await this.authService.googleSignIn(req, req.user);
    return res.redirect(this.getFrontendRedirectUrl());
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
