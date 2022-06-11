import {
    BeforeUpdate,
    Column,
    Entity, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {VariantEntity} from '../variant/variant.entity';
import {UserResultEntity} from '../user-results/user-result.entity';
import {CategoryEntity} from "../categories/entities/category.entity";

@Entity({name: 'questions'})
export class QuestionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

    @OneToMany(() => VariantEntity, (variant) => variant.belongsToQuestion)
    variants: VariantEntity[];

    @OneToMany(() => UserResultEntity, (userResult) => userResult.user)
    userQuestions: UserResultEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.questions, {
        onDelete: 'CASCADE',
        eager: true
    })
    belongsToCategory: CategoryEntity
}
