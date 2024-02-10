import { useEffect } from "react";
import { useStoreContext } from "../../store/store";
import Button from "../Button/Button";
import Title from "../Title/Title";

import SingleQuestion from "./SingleQuestion";
import styles from "./style.module.css";

const AllQuestions = () => {
  const { selectedSurvey, questions, getSurveyQuestions } = useStoreContext();

  useEffect(() => {
    if (selectedSurvey.id) {
      getSurveyQuestions();
    }
  }, [selectedSurvey]);

  return (
    <div className={styles.questions}>
      <Title>Questions</Title>
      <div className={styles.questions_container}>
        {!selectedSurvey.id && <p>Select a survey to see it's questions</p>}
        {selectedSurvey.id && questions.length === 0 && (
          <p>No Questions yet added to this survey</p>
        )}
        {selectedSurvey.id &&
          questions.length > 0 &&
          questions.map((question) => (
            <SingleQuestion key={question.id} question={question} />
          ))}
      </div>
      {selectedSurvey.id && (
        <Button onClickHandler={() => {}}>Add Question</Button>
      )}
    </div>
  );
};

export default AllQuestions;
