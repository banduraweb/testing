import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  async create(@Body() createQuestion: CreateQuestionDto) {
    return await this.questionService.createWithTransaction(createQuestion);
  }
  @Get()
  async findAll() {
    return await this.questionService.findAll();
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.questionService.delete(id);
  }
}
