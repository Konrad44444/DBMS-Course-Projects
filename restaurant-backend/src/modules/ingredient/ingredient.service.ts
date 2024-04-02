import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngredientDto } from './dto/CreateIngredient.dto';
import { UpdateIngredientDto } from './dto/UpdateIngredient.dto';

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllIngredients() {
    return this.prisma.ingredient.findMany();
  }

  async getIngredientById(id: number) {
    return this.prisma.ingredient.findUnique({
      where: {
        id,
      },
    });
  }

  async saveIngredient(data: CreateIngredientDto) {
    return this.prisma.ingredient.create({
      data: data,
    });
  }

  async deleteIngredient(id: number) {
    return this.prisma.ingredient.delete({
      where: {
        id,
      },
    });
  }

  async updateIngredient(id: number, data: UpdateIngredientDto) {
    return this.prisma.ingredient.update({
      where: {
        id,
      },
      data: data,
    });
  }
}
