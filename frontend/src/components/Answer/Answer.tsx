import { useStoreContext } from "../../store/store";
import { useEffect, useState } from "react";
import Title from "../Title/Title";
import styles from "./styles.module.css";

const Answer = () => {
  const { selectedQuestion, selectedSurvey } = useStoreContext();

  const [answer, setAnswer] = useState<any>();

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
    } catch (err: any) {
      throw err;
    }
  };

  const inputOnChangeHandler = (e: any) => {
    try {
      setAnswer(e.target.file);
    } catch (err: any) {
      throw err;
    }
  };

  useEffect(() => {
    if (selectedQuestion.id && selectedQuestion.answer) {
      setAnswer(selectedQuestion.answer);
    }
  }, [selectedQuestion]);

  const fileInput = (
    <input
      value={answer}
      type="file"
      required
      onChange={inputOnChangeHandler}
      accept=".pdf"
    />
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
