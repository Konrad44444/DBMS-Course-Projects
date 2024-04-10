/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [PrismaModule, CustomerModule],
})
export class OrderModule {}
