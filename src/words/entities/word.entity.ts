/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Word {
  @Prop({ required: true })
  englishWord: string;
  @Prop({ required: true })
  translation: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);