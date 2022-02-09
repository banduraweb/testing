import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserResultsService } from './user-results.service';
import { CreateUserResultDto } from './dto/create-user-result.dto';
import { UpdateUserResultDto } from './dto/update-user-result.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CurrentUserType } from '../sharedTypes/current-user';
import { AuthGuard } from '../guards/auth.guard';

@Controller('user-results')
export class UserResultsController {
  constructor(private readonly userResultsService: UserResultsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createUserResultDto: CreateUserResultDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return await this.userResultsService.create(createUserResultDto, user);
  }

  @Get()
  async findAll() {
    return await this.userResultsService.findAll();
  }

  @Get(':id')
  async findUsersResult(@Param('id') id: string) {
    return await this.userResultsService.findUsersResult(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserResultDto: UpdateUserResultDto,
  ) {
    return this.userResultsService.update(+id, updateUserResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResultsService.remove(+id);
  }
}
