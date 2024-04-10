import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customer: CustomerService,
  ) {}

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
    const customerEmail = order.customerEmail;

    const c = await this.customer.getCustomerByEmail(customerEmail);

    if (c === undefined) {
      const customerSaved = this.customer.saveCustomer({
        name: order.customerName,
        email: order.customerEmail,
      });

      return this.prisma.order.create({
        data: {
          totalAmount: order.totalAmount,
          date: new Date(),
          customer: {
            connect: {
              id: (await customerSaved).id,
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

    return this.prisma.order.create({
      data: {
        totalAmount: order.totalAmount,
        date: new Date(),
        customer: {
          connect: {
            id: c[0].id,
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
