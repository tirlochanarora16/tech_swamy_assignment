import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async getAllSurverys() {
    try {
      return this.prisma.survey.findMany();
    } catch (err: any) {
      throw err;
    }
  }

  async createSurvey(title: string) {
    try {
      const newQuestion = await this.prisma.survey.create({
        data: {
          title,
        },
      });

      return newQuestion;
    } catch (err: any) {
      if (err instanceof PrismaClientKnownRequestError) {
      }

      throw err;
    }
  }

  async getSurveyAnswers(surveyId: string) {
    try {
      const surveyAnswers = await this.prisma.question.findMany({
        where: {
          surveyId,
          OR: [
            {
              answer: {
                not: null,
              },
            },
            {
              fileLink: {
                not: null,
              },
            },
          ],
        },
      });

      const questionIdAndAnswers = surveyAnswers.map((question) => ({
        question_id: question.id,
        [question.questionType === 'FILE' ? 'file_link' : 'answer']:
          question.questionType === 'FILE'
            ? question.fileLink
            : question.answer,
      }));

      return questionIdAndAnswers;
    } catch (err: any) {
      throw err;
    }
  }
}
