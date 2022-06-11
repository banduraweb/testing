import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "../../question/question.entity";

@Entity({ name: 'categories' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(()=>QuestionEntity, question=>question.belongsToCategory)
    questions: QuestionEntity[]
}
