import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request?.session?.user;

    if (!user?.id) {
      throw new UnauthorizedException('Authentication required');
    }

    return true;
  }
}
