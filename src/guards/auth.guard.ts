import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {Request} from 'express';
import {UserEntity} from "../user/user.entity";

export interface ExpressRequest extends Request {
  user?: UserEntity
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    console.log(request.user, 'user');
    if (request.user) {
      return true;
    }

    throw new HttpException('Not authorized 22', HttpStatus.UNAUTHORIZED);
  }
}
