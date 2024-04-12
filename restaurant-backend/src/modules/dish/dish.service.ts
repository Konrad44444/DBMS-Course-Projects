/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDishDto } from './dto/CreateDish.dto';
import { UpdateDishDto } from './dto/UpdateDish.dto';

@Injectable()
export class DishService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRecipes() {
    return this.prisma.dish.findMany({
      include: {
        ingredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
  }

  async getDishById(id: number) {
    return this.prisma.dish.findUnique({
      where: {
        id,
      },
      include: {
        ingredients: {
          select: {
            ingredient: {
              select: {
                id: true,
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    });
  }

  async createDish(data: CreateDishDto) {
    return this.prisma.dish.create({
      data: {
        name: data.name,
        price: data.price,
        ingredients: {
          create: data.ingredients.map((ingredient) => ({
            quantity: ingredient.quantity,
            ingredient: {
              connect: {
                id: ingredient.id,
              },
            },
          })),
        },
      },
    });
  }

  async deleteDish(id: number) {
    return this.prisma.dish.delete({
      where: {
        id,
      },
    });
  }

  async updateDish(id: number, data: UpdateDishDto) {
    return this.prisma.dish.update({
      where: {
        id,
      },
      data: data,
    });
  }
}
