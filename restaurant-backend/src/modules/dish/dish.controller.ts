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
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/CreateDish.dto';
import { UpdateDishDto } from './dto/UpdateDish.dto';
import { UpdateIngredientQuantityInDishDto } from './dto/UpdateIngredientQuantityInDish.dto';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async getAllDishes() {
    return this.dishService.getAllRecipes();
  }

  @Get(':id')
  async getDish(@Param('id', ParseIntPipe) id: number) {
    return this.dishService.getDishById(id);
  }

  @Post()
  async saveDish(@Body() dish: CreateDishDto) {
    return this.dishService.createDish(dish);
  }

  @Put(':id')
  async updateDish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dish: UpdateDishDto,
  ) {
    return this.dishService.updateDish(id, dish);
  }

  @Delete(':id')
  async deleteDish(@Param('id', ParseIntPipe) id: number) {
    return this.dishService.deleteDish(id);
  }

  @Put(':dishId/ingredient/:ingredientId')
  async changeIngredientQuantityInDish(
    @Param('dishId', ParseIntPipe) dishId: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
    @Body() body: UpdateIngredientQuantityInDishDto,
  ) {
    return this.dishService.changeIngredientQuantityInDish(
      dishId,
      ingredientId,
      body.quantity,
    );
  }

  @Delete(':dishId/ingredient/:ingredientId')
  async deleteIngredientFromDish(
    @Param('dishId', ParseIntPipe) dishId: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ) {
    return this.dishService.deleteIngredientFormDish(dishId, ingredientId);
  }
}
