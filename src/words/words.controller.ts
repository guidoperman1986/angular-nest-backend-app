/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @Get()
  findAll(@Query() { skip, limit }) {
    return this.wordsService.findAll(skip, limit);
  }

  @Get('findAndDelete')
  findAllAndDelete(@Query() { englishWord }) {
    return this.wordsService.findAllAndDelete(englishWord);
  }

  @Get('/:word')
  findOne(@Param('word') word: string) {
    return this.wordsService.findOne(word);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(+id, updateWordDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordsService.remove(+id);
  }

  //TODO: traer lo ultimo que se grabo
}
