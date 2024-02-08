import { Body, Controller, Get, Post } from '@nestjs/common';
import { SurveyService } from './surveys.service';

@Controller('surveys')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Get()
  getAllSurveys() {
    return this.surveyService.getAllSurverys();
  }

  @Post('/create')
  createSurvey(@Body('title') title: string) {
    return this.surveyService.createSurvey(title);
  }
}
