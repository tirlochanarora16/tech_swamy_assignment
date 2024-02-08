-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'NUMBER', 'BOOLEAN', 'FILE');

-- CreateTable
CREATE TABLE "surveys" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "ques" TEXT NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "surveyId" TEXT NOT NULL,
    "answer" "QuestionType" NOT NULL,
    "fileLink" TEXT,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
