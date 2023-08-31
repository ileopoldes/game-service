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
import { JobDto } from './dto';

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

  @Get('all/publisher/:id')
  findAllByPublisher(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.findAllGamesByPublisherId(+id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.findOne(+id);
  }

  @Get(':id/publisher')
  findPublisherDataById(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.findPublisherDataByGameId(+id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/start-promotion')
  applyDiscount(@Body() job: JobDto) {
    return this.gameService.startJob(job);
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
