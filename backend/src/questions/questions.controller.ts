import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';

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

  @Patch('answer/:questionId')
  answerQuestion(
    @Param('questionId') questionId: string,
    @Body('answer') answer: string,
  ) {
    return this.questionsService.answerSurveyQuestion(questionId, answer);
  }

  @Patch(':questionId')
  updateQuestion(
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.questionsService.updateQuestion(questionId, dto);
  }
}
