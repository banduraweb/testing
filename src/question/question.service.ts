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
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(VariantEntity)
    private readonly variantRepository: Repository<VariantEntity>,
    @InjectRepository(UserResultEntity)
    private readonly userResultRepository: Repository<UserResultEntity>,
  ) {}
  async create(createQuestion: CreateQuestionDto): Promise<CreateQuestionDto> {
    const truly = createQuestion.variants.filter(
      (variant) => variant.isCorrect === true,
    ).length;
    if (truly !== 1) {
      throw new BadRequestException('falsy should be 3, truly - 1');
    }
    const newQuestion = this.questionRepository.create(createQuestion);
    const question = await this.questionRepository.save(newQuestion);
    const newVariants = this.variantRepository.create(
      createQuestion.variants.map((variant) => ({
        ...variant,
        belongsToQuestion: question,
      })),
    );
    const variants = await this.variantRepository.save(newVariants);

    return {
      ...question,
      variants,
    };
  }
  async createWithTransaction(createQuestion: CreateQuestionDto) {
    return await getManager().transaction(
      async (transactionalEntityManager) => {
        const truly = createQuestion.variants.filter(
          (variant) => variant.isCorrect === true,
        ).length;
        if (truly !== 1) {
          throw new BadRequestException('falsy should be 3, truly - 1');
        }
        const newQuestion = this.questionRepository.create({
          content: createQuestion.content,
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
  async findAll(currentUser) {
    const { role } = currentUser;
    let selectColumns = [
      'questions.id',
      'questions.content',
      'variants.id',
      'variants.variant',
      'variants.isCorrect',
    ];
    if (role?.role !== 'ADMIN') {
      selectColumns = selectColumns.filter(
        (column) => column !== 'variants.isCorrect',
      );
    }
    const questions = await getRepository(QuestionEntity)
      .createQueryBuilder('questions')
      .select(selectColumns)
      .leftJoin('questions.variants', 'variants')
      .getMany();
    const answeredQuestions = await this.userResultRepository.find({
      where: { user: parseInt(currentUser.id) },
    });
    if (answeredQuestions.length > 0) {
      const answered = answeredQuestions.map((userResult) => userResult.question.id);
      return questions.filter((question) => !answered.includes(question.id));
    }
    return questions;
    // return await this.questionRepository.find({ relations: ['variants'] });
  }
  async delete(id: string) {
    const question = await this.questionRepository.findOne(parseInt(id));
    if (!question) {
      throw new BadRequestException(`not found by id = ${id}`);
    }
    return await this.questionRepository.delete(parseInt(id));
  }
}
