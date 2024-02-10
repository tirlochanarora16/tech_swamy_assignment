import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SurveyService } from './surveys.service';

@Controller('surveys')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Get()
  getAllSurveys() {
    return this.surveyService.getAllSurverys();
  }

  @Get(':surveyId')
  getSurveyAnswers(@Param('surveyId') surveyId: string) {
    return this.surveyService.getSurveyAnswers(surveyId);
  }

  @Post('create')
  createSurvey(@Body('title') title: string) {
    return this.surveyService.createSurvey(title);
  }
}
