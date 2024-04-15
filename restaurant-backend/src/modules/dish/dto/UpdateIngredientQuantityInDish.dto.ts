import { IsNumber } from 'class-validator';

export class UpdateIngredientQuantityInDishDto {
  @IsNumber()
  quantity: number;
}
