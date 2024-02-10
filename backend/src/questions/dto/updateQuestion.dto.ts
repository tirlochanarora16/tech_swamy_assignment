import { QuestionType } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  ques: string;

  @IsString()
  @IsOptional()
  questionType: QuestionType;
}
