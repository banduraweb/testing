import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserResultDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  questionId: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  variantId: string;
}
