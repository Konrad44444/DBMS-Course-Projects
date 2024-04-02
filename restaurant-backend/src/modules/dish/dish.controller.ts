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
}
