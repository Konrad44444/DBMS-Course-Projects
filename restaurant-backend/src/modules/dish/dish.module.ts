import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';

@Module({
  providers: [DishService],
  controllers: [DishController],
  imports: [PrismaModule],
})
export class DishModule {}
