/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CustomerService } from '../customer/customer.service';

@Module({
  providers: [OrderService, CustomerService],
  controllers: [OrderController],
  imports: [PrismaModule],
})
export class OrderModule {}
