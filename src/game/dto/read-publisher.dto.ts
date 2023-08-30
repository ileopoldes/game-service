import { IsNumber, IsString } from 'class-validator';

export class ReadPublisherDto {
  @IsString()
  name: string;

  @IsNumber()
  siret: number;

  @IsString()
  phone: string;
}
