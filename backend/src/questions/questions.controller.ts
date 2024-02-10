import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
import { QuestionsService } from './questions.service';

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
  @UseInterceptors(FileInterceptor('file'))
  answerQuestion(
    @Param('questionId') questionId: string,
    @Body('answer') answer: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.questionsService.answerSurveyQuestion(
      questionId,
      file ? file.originalname : answer,
    );
  }

  @Patch(':questionId')
  updateQuestion(
    @Param('questionId') questionId: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.questionsService.updateQuestion(questionId, dto);
  }
}
