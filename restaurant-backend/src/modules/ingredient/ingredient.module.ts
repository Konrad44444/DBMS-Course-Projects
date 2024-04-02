import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [IngredientService],
  controllers: [IngredientController],
  imports: [PrismaModule],
})
export class IngredientModule {}
