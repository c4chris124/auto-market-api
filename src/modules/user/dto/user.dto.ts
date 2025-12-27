import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { AuthProvider, NotificationType, Role } from '@prisma/client';

import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@automarket.com' })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  @IsStrongPassword({
    minLength: 5,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
    minLowercase: 1,
  })
  public readonly password: string;

  @ApiPropertyOptional({ example: 'Jane' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  public readonly firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  public readonly lastName?: string;

  @ApiPropertyOptional({ example: '+305 5555 1234' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  public readonly phone?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsOptional()
  @IsUrl()
  public readonly avatarUrl?: string;

  @ApiPropertyOptional({ enum: Role, example: Role.USER })
  @IsOptional()
  @IsEnum(Role)
  public readonly role?: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Jane' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  public readonly firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  public readonly lastName?: string;

  @ApiPropertyOptional({ example: '+305 5555 1234' })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  public readonly phone?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @IsOptional()
  @IsUrl()
  public readonly avatarUrl?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: '9f3f5f8a-70a7-4c6b-8f51-4d5e2a2c6b18' })
  public readonly id: string;

  @ApiProperty({ example: 'user@automarket.com' })
  public readonly email: string;

  @ApiPropertyOptional({ example: 'Jane' })
  public readonly firstName?: string | null;

  @ApiPropertyOptional({ example: 'Doe' })
  public readonly lastName?: string | null;

  @ApiPropertyOptional({ example: '+1 305 555 1234' })
  public readonly phone?: string | null;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  public readonly avatarUrl?: string | null;

  @ApiProperty({ enum: Role, example: Role.USER })
  public readonly role: Role;

  @ApiProperty({ enum: AuthProvider, example: AuthProvider.LOCAL })
  public readonly authProvider: AuthProvider;

  @ApiPropertyOptional({ example: 'google-oauth2|1234567890' })
  public readonly authProviderId?: string | null;

  @ApiProperty()
  public readonly createdAt: Date;

  @ApiProperty()
  public readonly updatedAt: Date;
}

export class NotificationResponseDto {
  @ApiProperty({ example: 'c92f73f1-05d4-4ff2-9bdf-0c9d9c9a1f12' })
  public readonly id: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.SYSTEM })
  public readonly type: NotificationType;

  @ApiProperty({ example: 'Welcome to AutoMarket' })
  public readonly title: string;

  @ApiProperty({ example: 'Thanks for joining AutoMarket!' })
  public readonly message: string;

  @ApiPropertyOptional({ example: '2025-12-22T18:00:00.000Z' })
  public readonly readAt?: Date | null;

  @ApiProperty()
  public readonly createdAt: Date;
}
