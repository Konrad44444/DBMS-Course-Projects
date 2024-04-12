/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CustomerService } from '../customer/customer.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { DishService } from '../dish/dish.service';

@Module({
  providers: [OrderService, CustomerService, IngredientService, DishService],
  controllers: [OrderController],
  imports: [PrismaModule],
})
export class OrderModule {}
