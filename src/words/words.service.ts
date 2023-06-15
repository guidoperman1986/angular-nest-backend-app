import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Word } from './entities/word.entity';
import { Model } from 'mongoose';

@Injectable()
export class WordsService {
  constructor(@InjectModel(Word.name) private wordModle: Model<Word>) {}

  create(createWordDto: CreateWordDto) {
    const newWord = new this.wordModle({
      ...createWordDto,
    });

    try {
      newWord.save();

      return newWord;
    } catch (error) {
      throw new BadRequestException(
        'Some error ocurred. Please try again later',
      );
    }
  }

  findAll() {
    return this.wordModle.find();
  }

  async findOne(word: string) {
    const wordFound = await this.wordModle.findOne({ englishWord: word });
    if (wordFound) {
      return { wordFound };
    } else {
      throw new BadRequestException(
        `The word: '${word}' that you are looking for was not found`,
      );
    }
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
