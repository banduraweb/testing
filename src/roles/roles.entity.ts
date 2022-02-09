import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;
  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
