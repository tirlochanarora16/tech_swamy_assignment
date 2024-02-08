import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SurveyService } from './surveys.service';
import { SurveyController } from './surveys.controller';

@Module({
  providers: [PrismaService, SurveyService],
  controllers: [SurveyController],
})
export class SurveysModule {}
