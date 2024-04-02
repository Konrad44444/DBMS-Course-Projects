import { HttpStatus, Injectable } from '@nestjs/common';
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
          },
        },
      },
    });
  }

  async createDish(data: CreateDishDto) {
    const dish = await this.prisma.dish.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });

    data.ingredients.map((value) => {
      this.prisma.ingredientsOnDishes.create({
        data: {
          quantity: value.quantity,
          dishId: dish.id,
          ingredientId: value.id,
        },
      });
    });

    return HttpStatus.CREATED;
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
