export type QuestionType = "TEXT" | "NUMBER" | "BOOLEAN" | "FILE";

export type Question = {
  id: string;
  ques: string;
  questionType: QuestionType;
  surveyId: string;
  answer?: string;
  fileLink?: string;
};
