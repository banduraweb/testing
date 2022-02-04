import {
  IsNotEmpty,
  IsString,
  Min,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateVariantDto } from '../../variant/dto/create-variant.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content: string;
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants: CreateVariantDto[];
}
