import { createContext, useContext, useState } from "react";
import { Survey } from "../types/surveys";

interface ContextType {
  surveys: Survey[];
  setSurveys: React.Dispatch<React.SetStateAction<Survey[]>>;
  selectedSurvey: Survey;
  setSelectedSurvey: React.Dispatch<React.SetStateAction<Survey>>;
}

interface IProps {
  children: React.ReactNode;
}

const StoreContext = createContext<ContextType>({
  surveys: [],
  setSurveys: () => {},
  selectedSurvey: { id: "", title: "" },
  setSelectedSurvey: () => {},
});

export const StoreProvider: React.FC<IProps> = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey>({
    id: "",
    title: "",
  });

  return (
    <StoreContext.Provider
      value={{ surveys, selectedSurvey, setSurveys, setSelectedSurvey }}
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
