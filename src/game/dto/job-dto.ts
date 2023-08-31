import { IsNotEmpty, IsNumber } from 'class-validator';

export class JobDto {
  @IsNumber()
  @IsNotEmpty()
  totalMonth: number;

  @IsNumber()
  @IsNotEmpty()
  discount: number;
}
