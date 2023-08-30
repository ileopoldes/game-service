import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateGameDto } from './create-game.dto';

export class ReadGameDto extends CreateGameDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
