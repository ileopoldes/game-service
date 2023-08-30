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
  HttpCode,
  HttpStatus,
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

  @Get('all/publisher/:plublisherId')
  findAllByPublisher(@Param('publisherId', ParseIntPipe) id: string) {
    return 'TODO - Bender - get games from specific publisher';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.findOne(+id);
  }

  @Get(':id/publisher-data')
  findPublisherDataById(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.findPublisherDataByGameId(+id);
  }

  @Post('/start-promotion')
  applyDiscount() {
    return 'TODO - Bender - remove the games having a release date older than 18 months and apply a discount of 20% to all games having a release date between 12 and 18 months'
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    const hasAtLeastOneField = Object.keys(updateGameDto).some(
      (key) => updateGameDto[key] !== null && updateGameDto[key] !== undefined,
    );
    if (!hasAtLeastOneField) {
      throw new BadRequestException('At least one field should be provided');
    }

    return this.gameService.update(+id, updateGameDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.remove(+id);
  }
}
