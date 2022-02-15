import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserResultDto } from './dto/create-user-result.dto';
import { UpdateUserResultDto } from './dto/update-user-result.dto';
import { Repository } from 'typeorm';
import { UserResultEntity } from './user-result.entity';
import { QuestionEntity } from '../question/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { VariantEntity } from '../variant/variant.entity';
import { UserEntity } from '../user/user.entity';
import { CurrentUserType } from '../sharedTypes/current-user';

@Injectable()
export class UserResultsService {
  constructor(
    @InjectRepository(UserResultEntity)
    private readonly userResultRepository: Repository<UserResultEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(VariantEntity)
    private readonly variantRepository: Repository<VariantEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(
    createUserResultDto: CreateUserResultDto,
    currentUser: CurrentUserType,
  ): Promise<{ message: string }> {
    const { questionId, variantId } = createUserResultDto;
    const variant = await this.variantRepository.findOne(parseInt(variantId), {
      relations: ['belongsToQuestion'],
    });
    const question = await this.questionRepository.findOne(
      parseInt(questionId),
    );
    const user = await this.userRepository.findOne(parseInt(currentUser.id));
    if (!variant || !question || !user) {
      throw new BadRequestException('Not Found case 1');
    }
    if (variant.belongsToQuestion.id !== parseInt(questionId)) {
      throw new BadRequestException('Not Found case 2');
    }
    try {
      await this.userResultRepository.save({ user, question, variant });
    } catch (e) {
      throw new BadRequestException(
        'you have already answered to current question',
      );
    }
    return { message: 'Oh you are so quick rabbit' };
  }

  findAll() {
    return `This action returns all userResults`;
  }

  async findUsersResult(id) {
    return await this.userResultRepository.find({
      where: { user: parseInt(id) },
      relations: ['question', 'variant'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} userResult`;
  }

  update(id: number, updateUserResultDto: UpdateUserResultDto) {
    return `This action updates a #${id} userResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} userResult`;
  }
}
