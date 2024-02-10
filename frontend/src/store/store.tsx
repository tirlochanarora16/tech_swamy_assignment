import { createContext, useContext, useState } from "react";
import { AllSurveys } from "../types/surveys";

interface ContextType {
  surveys: AllSurveys[];
  setSurveys: React.Dispatch<React.SetStateAction<AllSurveys[]>>;
}

interface IProps {
  children: React.ReactNode;
}

const StoreContext = createContext<ContextType>({
  surveys: [],
  setSurveys: () => {},
});

export const StoreProvider: React.FC<IProps> = ({ children }) => {
  const [surveys, setSurveys] = useState<AllSurveys[]>([]);

  return (
    <StoreContext.Provider value={{ surveys, setSurveys }}>
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
