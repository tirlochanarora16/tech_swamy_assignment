import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async getAllQuestions() {
    return this.prisma.question.findMany();
  }

  async getSurveryQuestions(surveyId: string) {
    try {
      const surveyQuestions = await this.prisma.question.findMany({
        where: {
          surveyId,
        },
      });

      return surveyQuestions;
    } catch (err: any) {
      if (err instanceof PrismaClientKnownRequestError) {
      }

      throw err;
    }
  }

  async createSurveyQuestion(surveyId: string, body: CreateQuestionDto) {
    try {
      const newQuestion = await this.prisma.question.create({
        data: {
          surveyId,
          ...body,
        },
      });

      return newQuestion;
    } catch (err: any) {
      if (err instanceof PrismaClientValidationError) {
        throw new HttpException(
          'Invalid type received for a field',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw err;
    }
  }
}
