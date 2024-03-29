import axios from "axios";
import { useEffect, useState } from "react";
import { useStoreContext } from "../../store/store";
import Title from "../Title/Title";
import { API_URL, apiPaths } from "../../api/api";
import styles from "./styles.module.css";

const Answer = () => {
  const {
    selectedQuestion,
    selectedSurvey,
    getSurveyQuestions,
    setSelectedQuestion,
  } = useStoreContext();

  const [answer, setAnswer] = useState<any>();

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (selectedQuestion.questionType === "FILE") {
        const formData = new FormData();
        formData.append("file", answer);
        const response = await axios.patch(
          `${API_URL}/${apiPaths.answerQuestion(selectedQuestion.id)}`,
          formData
        );

        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
      } else {
        const response = await axios.patch(
          `${API_URL}/${apiPaths.answerQuestion(selectedQuestion.id)}`,
          {
            answer,
          }
        );

        if (response.status !== 200) {
          throw new Error("Something went wrong");
        }
      }

      alert("Answer submitted!");

      setSelectedQuestion(selectedQuestion);

      getSurveyQuestions();
    } catch (err: any) {
      throw err;
    }
  };

  const inputOnChangeHandler = (e: any) => {
    try {
      setAnswer(
        selectedQuestion.questionType === "FILE"
          ? e.target.files[0]
          : e.target.value
      );
    } catch (err: any) {
      throw err;
    }
  };

  console.log(answer);

  useEffect(() => {
    if (selectedQuestion.id && selectedQuestion.answer) {
      setAnswer(selectedQuestion.answer);
    } else {
      setAnswer("");
    }
  }, [selectedQuestion]);

  const fileInput = (
    <input type="file" required onChange={inputOnChangeHandler} accept=".pdf" />
  );

  const booleanInput = (
    <select
      required
      onChange={inputOnChangeHandler}
      value={answer}
      className={styles.answer_select}
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  );

  const textNumberInput = (
    <input
      type={selectedQuestion.questionType === "NUMBER" ? "number" : "text"}
      required
      placeholder="Enter answer"
      onChange={inputOnChangeHandler}
      className={styles.answer_input}
      value={answer}
    />
  );

  return (
    <div className={styles.answer}>
      <Title>Answer</Title>
      <div className={styles.answer_container}>
        {!selectedSurvey.id && (
          <p>Please select a survey and a question to answer</p>
        )}
        {selectedSurvey.id && !selectedQuestion.id && (
          <p>Select a question to answer</p>
        )}
        {selectedQuestion.id && (
          <>
            <form className={styles.answer_form} onSubmit={formSubmitHandler}>
              {selectedQuestion.questionType === "FILE" && fileInput}
              {selectedQuestion.questionType === "BOOLEAN" && booleanInput}
              {(selectedQuestion.questionType === "NUMBER" ||
                selectedQuestion.questionType === "TEXT") &&
                textNumberInput}
              <button className={styles.answer_btn} type="submit">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Answer;
