import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post, Query,
  UseGuards,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserType } from '../sharedTypes/current-user';
import { UpdateQuestionDto } from './dto/update-question.dto'

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
  async findAll(@CurrentUser() currentUser: CurrentUserType, @Query('categoryId') categoryId: string ) {
    return await this.questionService.findAll(currentUser, categoryId);
  }
  @UseGuards(AdminGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.questionService.delete(id);
  }
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }
}
