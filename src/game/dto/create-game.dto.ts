import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  publisherId: number;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  releaseDate: Date;
}
