import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Role } from '@prisma/client';
import { RolesGuard } from '@guards/roles.guard';
import { Roles } from '@decorators/roles.decorator';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@ApiTags('Users')
@ApiCookieAuth()
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  @ApiCreatedResponse({ type: UserResponseDto })
  public async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: UserResponseDto })
  public async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, dto);
  }
}
