import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import {AuthGuard} from "../guards/auth.guard";
import {AdminGuard} from "../guards/admin.guard";
import {Serialize} from "../interceptors/serialize.interceptor";
import {CurrentUser} from "../decorators/current-user.decorator";

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createQuestion: CreateQuestionDto) {
    return await this.questionService.createWithTransaction(createQuestion);
  }
  @Get()
  @UseGuards(AuthGuard)
  async findAll(@CurrentUser() currentUser: any) {
    return await this.questionService.findAll(currentUser);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.questionService.delete(id);
  }
}
