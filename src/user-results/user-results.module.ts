import { Module } from '@nestjs/common';
import { UserResultsService } from './user-results.service';
import { UserResultsController } from './user-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResultEntity } from './user-result.entity';
import { QuestionEntity } from '../question/question.entity';
import { VariantEntity } from '../variant/variant.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserResultEntity,
      QuestionEntity,
      VariantEntity,
      UserEntity,
    ]),
  ],
  controllers: [UserResultsController],
  providers: [UserResultsService],
})
export class UserResultsModule {}
