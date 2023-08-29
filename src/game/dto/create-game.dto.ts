import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
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

  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;
}
