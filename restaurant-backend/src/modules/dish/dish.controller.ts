import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DishService } from './dish.service';

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
}
