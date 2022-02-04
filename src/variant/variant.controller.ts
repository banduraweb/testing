import { Body, Controller, Post } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';

@Controller('/variant')
export class VariantController {
  @Post()
  create(@Body() createVariantDto: CreateVariantDto) {
    return 'This action adds a variant';
  }
}
