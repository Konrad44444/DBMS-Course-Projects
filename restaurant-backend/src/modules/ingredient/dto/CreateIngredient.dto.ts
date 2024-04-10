/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  threshold: number;
}
