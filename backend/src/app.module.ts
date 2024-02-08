import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { SurveysModule } from './surveys/surveys.module';

@Module({
  imports: [QuestionsModule, SurveysModule],
})
export class AppModule {}
