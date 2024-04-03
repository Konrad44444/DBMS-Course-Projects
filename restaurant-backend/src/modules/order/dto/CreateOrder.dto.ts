import { ArrayMinSize, IsNumber, ValidateNested } from 'class-validator';
import { DishInOrderDto } from './DishInOrder.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber()
  totalAmount: number;

  @IsNumber()
  customerId: number;

  @ArrayMinSize(1)
  @Type(() => DishInOrderDto)
  @ValidateNested({ each: true })
  dishes: DishInOrderDto[];
}
