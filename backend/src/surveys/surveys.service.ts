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
}
