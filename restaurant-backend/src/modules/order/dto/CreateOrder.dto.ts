/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsNumber, IsString, ValidateNested } from 'class-validator';
import { DishInOrderDto } from './DishInOrder.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber()
  totalAmount: number;

  @IsString()
  customerEmail: string;

  @IsString()
  customerName: string;

  @ArrayMinSize(1)
  @Type(() => DishInOrderDto)
  @ValidateNested({ each: true })
  dishes: DishInOrderDto[];
}
