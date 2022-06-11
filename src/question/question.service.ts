import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import {
  EntityManager,
  getManager,
  getRepository,
  Repository,
  Transaction,
  TransactionManager,
  TransactionRepository,
} from 'typeorm';
import { VariantEntity } from '../variant/variant.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserResultEntity } from '../user-results/user-result.entity';
import {CategoryEntity} from "../categories/entities/category.entity";
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(VariantEntity)
    private readonly variantRepository: Repository<VariantEntity>,
    @InjectRepository(UserResultEntity)
    private readonly userResultRepository: Repository<UserResultEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createWithTransaction(createQuestion: CreateQuestionDto) {
    return await getManager().transaction(
      async (transactionalEntityManager) => {
        const truly = createQuestion.variants.filter(
          (variant) => variant.isCorrect === true,
        ).length;
        if (truly !== 1) {
          throw new BadRequestException('falsy should be 3, truly - 1');
        }
        const category = await this.categoryRepository.findOne(+createQuestion.belongsToCategoryId)
        if(!category){
            throw new BadRequestException('No such category');
        }
          const newQuestion = this.questionRepository.create({
          content: createQuestion.content,
          belongsToCategory: category,
          variants: createQuestion.variants.map(({ variant, isCorrect }) => ({
            variant,
            isCorrect,
          })),
        });
        const question = await transactionalEntityManager.save<QuestionEntity>(
          newQuestion,
        );
        const newVariants = this.variantRepository.create(
          createQuestion.variants.map(({ variant, isCorrect }) => ({
            variant,
            isCorrect,
            belongsToQuestion: question,
          })),
        );
        const variants = await transactionalEntityManager.save<VariantEntity>(
          newVariants,
        );

        return {
          ...question,
          variants: variants.map((variant) => ({
            variant: variant.variant,
            isCorrect: variant.isCorrect,
            id: variant.id,
          })),
        };
      },
    );
  }
  async findAll(currentUser, categoryId) {
      const { role } = currentUser;
    let selectColumns = [
      'questions.id',
      'questions.content',
      'variants.id',
      'variants.variant',
      'variants.isCorrect',
      'categories.id',
      'categories.name',
    ];
    if (role?.role !== 'ADMIN') {
      selectColumns = selectColumns.filter(
        (column) => column !== 'variants.isCorrect',
      );
    }
    let questions = await getRepository(QuestionEntity)
      .createQueryBuilder('questions')
      .select(selectColumns)
      .leftJoin('questions.variants', 'variants')
      .leftJoin('questions.belongsToCategory', 'categories')
      .getMany();

    if(categoryId){
        questions = questions.filter(item=>item.belongsToCategory.id === +categoryId)
    }

      const answeredQuestions = await this.userResultRepository.find({
      where: { user: parseInt(currentUser.id) },
    });
    if (answeredQuestions.length > 0) {
      const answered = answeredQuestions.map((userResult) => userResult.question.id);
      return questions.filter((question) => !answered.includes(question.id));
    }
    return questions;

  }
  async delete(id: string) {
    const question = await this.questionRepository.findOne(parseInt(id));
    if (!question) {
      throw new BadRequestException(`not found by id = ${id}`);
    }
    return await this.questionRepository.delete(parseInt(id));
  }
}
