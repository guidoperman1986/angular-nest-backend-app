import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './entities/word.entity';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [WordsController],
  providers: [WordsService, AuthService],
})
export class WordsModule {}
