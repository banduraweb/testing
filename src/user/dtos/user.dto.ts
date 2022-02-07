import { Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  userName: string;
}
