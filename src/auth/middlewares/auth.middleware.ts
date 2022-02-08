import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import {UserService} from "../../user/user.service";
import {UserEntity} from "../../user/user.entity";
import {Request} from 'express';

export interface ExpressRequest extends Request {
  user?: UserEntity
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, process.env.JWT_SECRET);
      const user = await this.userService.findById(decode.userId);
      console.log(user, 'user');
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      req.user = null;
      next();
    }
  }
}

