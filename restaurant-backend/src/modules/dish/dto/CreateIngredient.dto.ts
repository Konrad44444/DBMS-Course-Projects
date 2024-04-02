import { IsNumber } from 'class-validator';

export class CreateIngredientDto {
  @IsNumber()
  id: number;

  @IsNumber()
  quantity: number;
}
