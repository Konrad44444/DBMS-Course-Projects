import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateDishDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
