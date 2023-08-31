import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateGameDto } from './create-game.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReadGameDto extends CreateGameDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
