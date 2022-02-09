import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolesEntity } from '../roles/roles.entity';
import { QuestionEntity } from '../question/question.entity';
import { VariantEntity } from '../variant/variant.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  userName: string;
  @Column()
  password: string;
  @ManyToOne(() => RolesEntity, (role) => role.users, { eager: true })
  role: RolesEntity;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
