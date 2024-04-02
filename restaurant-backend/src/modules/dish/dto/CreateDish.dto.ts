import {
  ArrayMinSize,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateIngredientDto } from './CreateIngredient.dto';
import { Type } from 'class-transformer';

export class CreateDishDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @ArrayMinSize(1)
  @Type(() => CreateIngredientDto)
  @ValidateNested({ each: true })
  ingredients: CreateIngredientDto[];
}
