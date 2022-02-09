import { PartialType } from '@nestjs/mapped-types';
import { CreateUserResultDto } from './create-user-result.dto';

export class UpdateUserResultDto extends PartialType(CreateUserResultDto) {}
