import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { CustomerService } from '../customer/customer.service';
import { IngredientService } from '../ingredient/ingredient.service';
import { DishService } from '../dish/dish.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customer: CustomerService,
    private readonly ingredient: IngredientService,
    private readonly dish: DishService,
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
                id: true,
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
            quantity: true,
          },
        },
      },
    });
  }

  async saveOrder(order: CreateOrderDto) {
    const customerEmail = order.customerEmail;

    const c = await this.customer.getCustomerByEmail(customerEmail);

    // modify ingredients quantities
    order.dishes.forEach(async (d) => {
      const dishFromDb = await this.dish.getDishById(d.dishId);

      dishFromDb.ingredients.forEach(async (i) => {
        const ingredientFromDb = await this.ingredient.getIngredientById(
          i.ingredient.id,
        );

        await this.ingredient.updateIngredient(i.ingredient.id, {
          name: ingredientFromDb.name,
          price: ingredientFromDb.price,
          quantity: ingredientFromDb.quantity - d.quantity * i.quantity,
          threshold: ingredientFromDb.threshold,
        });
      });
    });

    if (c === null) {
      const customerSaved = this.customer.saveCustomer({
        name: order.customerName,
        email: order.customerEmail,
      });

      const orderCreated = this.prisma.order.create({
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

      return this.getOrderById((await orderCreated).id);
    }

    const orderCreated = this.prisma.order.create({
      data: {
        totalAmount: order.totalAmount,
        date: new Date(),
        customer: {
          connect: {
            id: c.id,
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

    return this.getOrderById((await orderCreated).id);
  }
}
