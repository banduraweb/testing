import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Serialize(UserDto)
  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @Post('/signin')

  async login(@Body() createUserDto: Omit<CreateUserDto , 'role'>) {
    return await this.userService.login(createUserDto);
  }
}
