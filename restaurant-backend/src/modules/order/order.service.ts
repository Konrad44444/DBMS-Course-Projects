import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dishes: {
          select: {
            dish: {
              select: {
                name: true,
                price: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
  }

  async getOrderById(id: number) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        dishes: {
          select: {
            dish: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async saveOrder(order: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        totalAmount: order.totalAmount,
        date: new Date(),
        customer: {
          connect: {
            id: order.customerId,
          },
        },
        dishes: {
          create: order.dishes.map((dish) => ({
            quantity: dish.quantity,
            dish: {
              connect: {
                id: dish.dishId,
              },
            },
          })),
        },
      },
    });
  }
}
