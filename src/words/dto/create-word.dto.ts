import { IsString, MinLength } from 'class-validator';

export class CreateWordDto {
  @IsString()
  @MinLength(3)
  englishWord: string;
  @IsString()
  @MinLength(3)
  translation: string;
}
