import {IsIn, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  userName: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  @IsIn(['ADMIN', 'USER'])
  role: string;
}
