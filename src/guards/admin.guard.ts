import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    } else if (request.user.role.role === 'ADMIN') {
      return true;
    }
    throw new HttpException('Not allowed', HttpStatus.FORBIDDEN);
  }
}
