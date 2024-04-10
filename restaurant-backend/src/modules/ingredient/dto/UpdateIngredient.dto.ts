import { IsNumber, IsString } from 'class-validator';

export class UpdateIngredientDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  threshold: number;
}
