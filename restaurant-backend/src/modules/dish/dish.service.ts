import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
                quantity: true,
              },
            },
          },
        },
      },
    });
  }
}
