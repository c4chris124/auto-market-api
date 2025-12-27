import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionUser } from '@common/types/session-user.type';

export const SessionUserParam = createParamDecorator(
  (_data: unknown, context: ExecutionContext): SessionUser | undefined => {
    const request = context.switchToHttp().getRequest();
    return request?.session?.user;
  },
);
