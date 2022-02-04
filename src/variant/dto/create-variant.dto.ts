import {
  IsNotEmpty,
  IsString,
  Min,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreateVariantDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  variant: string;
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}
