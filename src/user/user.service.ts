import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
const scrypt = promisify(_scrypt);
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { userName, password } = createUserDto;
    const candidate = await this.userRepository.findOne({ userName });
    if (candidate) {
      throw new BadRequestException('user with current name already existed');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.userRepository.save({ userName, password: result });
    return user;
  }
  async login(createUserDto: CreateUserDto): Promise<any> {
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
  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.userName,
      },
      process.env.JWT_SECRET,
    );
  }
}
