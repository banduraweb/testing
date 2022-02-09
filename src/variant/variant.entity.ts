import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from '../question/question.entity';
import { UserResultEntity } from '../user-results/user-result.entity';
@Entity({ name: 'variants' })
export class VariantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  variant: string;

  @Column()
  isCorrect: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => QuestionEntity, (question) => question.variants, {
    onDelete: 'CASCADE',
  })
  belongsToQuestion: QuestionEntity;

  @OneToMany(() => UserResultEntity, (userResult) => userResult.user)
  userVariants: UserResultEntity[];
}
