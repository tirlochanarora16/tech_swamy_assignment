import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getAllQuestions() {
    return this.questionsService.getAllQuestions();
  }

  @Get(':id')
  getSurveyQuestioms(@Param('id') surveyId: string) {
    return this.questionsService.getSurveryQuestions(surveyId);
  }

  @Post('create/:id')
  createSurveyQuestion(
    @Param('id') surveyId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionsService.createSurveyQuestion(surveyId, dto);
  }
}
