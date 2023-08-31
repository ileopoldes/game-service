import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class JobDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalMonth: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  discount: number;
}
