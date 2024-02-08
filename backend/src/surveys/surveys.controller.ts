import { Controller, Get } from '@nestjs/common';
import { SurveyService } from './surveys.service';

@Controller('surverys')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Get()
  question() {
    return 'hello world';
  }
}
