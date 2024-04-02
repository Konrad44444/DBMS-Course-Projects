import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/CreateIngredient.dto';
import { UpdateIngredientDto } from './dto/UpdateIngredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  async getAllIngredients() {
    return this.ingredientService.getAllIngredients();
  }

  @Get(':id')
  async getIngredientById(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.getIngredientById(id);
  }

  @Post()
  async saveIngredient(@Body() ingredient: CreateIngredientDto) {
    return this.ingredientService.saveIngredient(ingredient);
  }

  @Put(':id')
  async updateIngredient(
    @Param('id', ParseIntPipe) id: number,
    @Body() ingredient: UpdateIngredientDto,
  ) {
    return this.ingredientService.updateIngredient(id, ingredient);
  }

  @Delete(':id')
  async deleteIngredient(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.deleteIngredient(id);
  }
}
