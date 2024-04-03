import { IsNumber, IsPositive } from 'class-validator';

export class DishInOrderDto {
  @IsNumber()
  dishId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
