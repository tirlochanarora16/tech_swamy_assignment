import axios from "axios";
import { createContext, useContext, useState } from "react";
import { API_URL, apiPaths } from "../components/api/api";
import { Question } from "../types/questions";
import { Survey } from "../types/surveys";

interface ContextType {
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
  selectedSurvey: Survey;
  setSelectedSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  selectedQuestion: Question;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<Question>>;
  getSurveyQuestions: () => any;
  getSurveys: () => any;
}

interface IProps {
  children: React.ReactNode;
}

export const questionDefault: Question = {
  id: "",
  ques: "",
  questionType: "FILE",
  surveyId: "",
  answer: "",
  fileLink: "",
};

const StoreContext = createContext<ContextType>({
  surveys: [],
  setSurveys: () => {},
  selectedSurvey: { id: "", title: "" },
  setSelectedSurvey: () => {},
  questions: [],
  setQuestions: () => {},
  selectedQuestion: questionDefault,
  setSelectedQuestion: () => {},
  getSurveyQuestions: () => {},
  getSurveys: () => {},
});

export const StoreProvider: React.FC<IProps> = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey>({
    id: "",
    title: "",
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] =
    useState<Question>(questionDefault);

  const getSurveys = async () => {
    try {
      const response = await axios.get(`${API_URL}/${apiPaths.getSurveys()}`);

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      const surveys = response.data as Survey[];

      setSurveys(surveys);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getSurveyQuestions = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/${apiPaths.getSurveyQuestions(selectedSurvey.id)}`
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      setQuestions(response.data as Question[]);
    } catch (err: any) {
      throw err;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        surveys,
        selectedSurvey,
        questions,
        selectedQuestion,
        setSurveys,
        setSelectedSurvey,
        setQuestions,
        setSelectedQuestion,
        getSurveyQuestions,
        getSurveys,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
