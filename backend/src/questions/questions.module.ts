import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestionsController } from './questions.controller';

@Module({
  providers: [QuestionsService, PrismaService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
