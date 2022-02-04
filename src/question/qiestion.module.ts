import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { QuestionEntity } from './question.entity';
import { QuestionService } from './question.service';
import { VariantEntity } from '../variant/variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, VariantEntity])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
