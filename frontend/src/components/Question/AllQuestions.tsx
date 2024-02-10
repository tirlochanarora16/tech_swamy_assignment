import { useEffect } from "react";
import { useStoreContext } from "../../store/store";
import Button from "../Button/Button";
import Title from "../Title/Title";

import styles from "./style.module.css";
import axios from "axios";
import { API_URL, apiPaths } from "../api/api";
import { Question } from "../../types/questions";

const AllQuestions = () => {
  const { selectedSurvey, setQuestions, questions } = useStoreContext();

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

  useEffect(() => {
    if (selectedSurvey.id) {
      getSurveyQuestions();
    }
  }, [selectedSurvey]);

  console.log(questions);

  return (
    <div className={styles.questions}>
      <Title>Questions</Title>
      <div className={styles.questions_container}>
        {!selectedSurvey.id && <p>Select a survey to see it's questions</p>}
      </div>
      <Button onClickHandler={() => {}}>Add Question</Button>
    </div>
  );
};

export default AllQuestions;
