import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  TableForeignKey, Unique,
} from 'typeorm';
import { VariantEntity } from '../variant/variant.entity';
import { UserEntity } from '../user/user.entity';
import { QuestionEntity } from '../question/question.entity';

@Entity({ name: 'users_result' })
@Unique(['user', 'question'])
@Unique(['user', 'question', 'variant'])
export class UserResultEntity {

  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
  @ManyToOne(() => QuestionEntity, (question) => question.userQuestions, {
    eager: true,
  })
  question: QuestionEntity;
  @ManyToOne(() => VariantEntity, (variant) => variant.userVariants, {
    eager: true,
  })
  variant: VariantEntity;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
