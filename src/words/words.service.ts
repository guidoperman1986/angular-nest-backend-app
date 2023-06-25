/* eslint-disable prettier/prettier */
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

  async findAll(skip: number, limit: number) {
    const countItems = await this.wordModle.countDocuments({}).exec();
    const totalPages = (await Math.floor((countItems - 1) / limit)) + 1;

    const words = await this.wordModle.find().skip(skip).limit(limit);

    return {
      words,
      countItems,
      totalPages,
    };
  }

  async findAllAndDelete(englishWord: string) {
    const words = await this.wordModle.find({englishWord})

    let result;
    if (words.length > 0) {
      result = await this.wordModle.deleteMany({ englishWord });
    } else {
      result = {
        ok: false,
        message: 'No word was found'
      }
    }

    
    return {
      ok: true,
      result
    };
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
