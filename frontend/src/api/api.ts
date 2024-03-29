export const API_URL = "http://localhost:3000";

export const apiPaths = {
  getSurveys: () => "surveys",
  getSurveyQuestions: (id: string) => `questions/${id}`,
  answerQuestion: (id: string) => `questions/answer/${id}`,
  getSurveyAnswers: (id: string) => `surveys/${id}`,
  createSurvey: () => `surveys/create`,
  createSurveyQuestion: (id: string) => `questions/create/${id}`,
  updateSurveyQuestion: (id: string) => `questions/${id}`,
};
