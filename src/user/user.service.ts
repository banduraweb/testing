import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
import {RolesService} from "../roles/roles.service";
const scrypt = promisify(_scrypt);
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RolesService
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { userName, password, role: givenRole } = createUserDto;
    const candidate = await this.userRepository.findOne({ userName });
    if (candidate) {
      throw new BadRequestException('user with current name already existed');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const role = await this.roleService.findByName(givenRole);
    const user = await this.userRepository.save({ userName, password: result, role:  role});
    return {...user, role: role.role};
  }

  async login(createUserDto: Omit<CreateUserDto , 'role'>): Promise<{token: string}> {
    const { userName, password } = createUserDto;
    const user = await this.userRepository.findOne({ userName }, {});
    if (!user) {
      throw new BadRequestException('Not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash === hash.toString('hex')) {
      return {
        token: this.generateJwt(user),
      };
    } else {
      throw new BadRequestException('bad password');
    }
  }
  async findById (id: string):Promise<UserEntity> {
    const user = await this.userRepository.findOne(parseInt(id));
    if(!user){
      throw new BadRequestException('Not found');
    }
    return user;
  }
  generateJwt(user: UserEntity): string {
    return sign(
      {
        userId: user.id,
        userName: user.userName,
        role: user?.role?.role
      },
      process.env.JWT_SECRET,
    );
  }
}
