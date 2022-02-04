import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantEntity } from './variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariantEntity])],
  providers: [VariantService],
  controllers: [VariantController],
  exports: [VariantService],
})
export class VariantModule {}
