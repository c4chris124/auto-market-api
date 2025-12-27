import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { SessionAuthGuard } from '@guards/session-auth.guard';
import type { SessionUser } from '@common/types/session-user.type';
import { SessionUserParam } from '@decorators/session-user.decorator';
import {
  NotificationResponseDto,
  UpdateProfileDto,
  UserResponseDto,
} from './dto/user.dto';

@ApiTags('Me')
@ApiCookieAuth()
@UseGuards(SessionAuthGuard)
@Controller({ path: 'me', version: '1' })
export class MeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserResponseDto })
  public async getProfile(
    @SessionUserParam() user: SessionUser,
  ): Promise<UserResponseDto> {
    return this.userService.getProfile(user.id);
  }

  @Patch()
  @ApiOkResponse({ type: UserResponseDto })
  public async updateProfile(
    @SessionUserParam() user: SessionUser,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateProfile(user.id, dto);
  }

  @Get('notifications')
  @ApiOkResponse({ type: NotificationResponseDto, isArray: true })
  public async listNotifications(
    @SessionUserParam() user: SessionUser,
  ): Promise<NotificationResponseDto[]> {
    return this.userService.getNotifications(user.id);
  }

  @Patch('notifications/:id/read')
  @ApiOkResponse({ type: NotificationResponseDto })
  public async markNotificationRead(
    @SessionUserParam() user: SessionUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<NotificationResponseDto> {
    return this.userService.markNotificationRead(user.id, id);
  }
}
