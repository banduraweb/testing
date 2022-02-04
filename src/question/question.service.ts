import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import {
  EntityManager,
  getManager,
  Repository,
  Transaction,
  TransactionManager,
  TransactionRepository,
} from 'typeorm';
import { VariantEntity } from '../variant/variant.entity';
import { BadRequestException } from '@nestjs/common';

export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(VariantEntity)
    private readonly variantRepository: Repository<VariantEntity>,
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
        const newQuestion = this.questionRepository.create(createQuestion);
        const question = await transactionalEntityManager.save<QuestionEntity>(
          newQuestion,
        );
        const newVariants = this.variantRepository.create(
          createQuestion.variants.map((variant) => ({
            ...variant,
            belongsToQuestion: question,
          })),
        );
        const variants = await transactionalEntityManager.save<VariantEntity>(
          newVariants,
        );

        return {
          ...question,
          variants,
        };
      },
    );
  }
  async findAll() {
    return await this.questionRepository.find({ relations: ['variants'] });
  }
}
