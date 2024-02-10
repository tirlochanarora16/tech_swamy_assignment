import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';

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
      const questionsCount = await this.prisma.question.count({
        where: {
          surveyId: surveyId,
        },
      });

      if (questionsCount > 10) {
        throw new HttpException(
          'You have already created 10 questions inside this survey',
          HttpStatus.BAD_REQUEST,
        );
      }

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

  async answerSurveyQuestion(questionId: string, answer: string) {
    try {
      const question = await this.prisma.question.findUnique({
        where: { id: questionId },
      });

      if (!question) {
        throw new HttpException('Invalid quesiton id', HttpStatus.BAD_REQUEST);
      }

      const answerQues = await this.prisma.question.update({
        where: {
          id: questionId,
        },
        data: {
          [question.questionType === 'FILE' ? 'fileLink' : 'answer']: answer,
        },
      });

      return answerQues;
    } catch (err: any) {
      throw err;
    }
  }

  async updateQuestion(questionId: string, body: UpdateQuestionDto) {
    try {
      if (Object.keys(body).length === 0) {
        throw new HttpException('Body cannot be empty', HttpStatus.BAD_REQUEST);
      }

      const updatedQuestion = await this.prisma.question.update({
        where: { id: questionId },
        data: { ...body, fileLink: null, answer: null },
      });

      return updatedQuestion;
    } catch (err) {
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
