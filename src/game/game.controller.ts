import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get('all')
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    const hasAtLeastOneField = Object.keys(updateGameDto).some(
      (key) => updateGameDto[key] !== undefined,
    );
    // TODO - Bender - criar unit test para verificar isto aqui
    if (!hasAtLeastOneField) {
      throw new BadRequestException('At least one field should be provided');
    }

    return this.gameService.update(+id, updateGameDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.remove(+id);
  }
}
