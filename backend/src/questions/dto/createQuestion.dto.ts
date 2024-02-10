import { QuestionType } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  ques: string;

  @IsNotEmpty()
  @IsString()
  questionType: QuestionType;
}
