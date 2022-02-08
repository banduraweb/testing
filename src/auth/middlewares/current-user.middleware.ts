import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


import {UserService} from "../../user/user.service";
import {UserEntity} from "../../user/user.entity";


interface iRequest extends Request {
  user?: UserEntity;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UserService) {}

  async use(req: iRequest, res: Response, next: NextFunction) {

    // @ts-ignore
    const { userId } = req.user || {};

    if (userId) {
      const user = await this.usersService.findById(userId);
      req.user = user;
    }
    next();
  }
}
