import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [DishService],
  controllers: [DishController],
  imports: [PrismaModule],
})
export class DishModule {}
