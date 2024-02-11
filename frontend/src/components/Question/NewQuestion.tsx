import { useState } from "react";
import { questionDefault, useStoreContext } from "../../store/store";
import { QuestionInput, defaultQuestionInput } from "../../types/questions";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./style.module.css";
import axios from "axios";
import { API_URL, apiPaths } from "../../api/api";

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewQuestion: React.FC<IProps> = ({ setShowModal }) => {
  const { selectedSurvey, setSelectedQuestion, getSurveyQuestions } =
    useStoreContext();

  const [formInput, setFormInput] =
    useState<QuestionInput>(defaultQuestionInput);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormInput((previousValue) => {
      return {
        ...previousValue,
        [e.target.id]: e.target.value,
      };
    });
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${API_URL}/${apiPaths.createSurveyQuestion(selectedSurvey.id)}`,
        formInput
      );

      if (response.status !== 201) {
        throw new Error("Something went wrong");
      }
      resetState();
    } catch (err: any) {
      throw err;
    }
  };

  const resetState = () => {
    setFormInput(defaultQuestionInput);
    setShowModal(false);
    setSelectedQuestion(questionDefault);
    getSurveyQuestions();
  };

  return (
    <form className={styles.question_form} onSubmit={formSubmitHandler}>
      <Input
        id="ques"
        type="text"
        placeholder="Enter question title"
        value={formInput.ques}
        onChange={inputChangeHandler}
      />
      <select
        value={formInput.questionType}
        id="questionType"
        onChange={inputChangeHandler}
        className={styles.question_type}
        required
      >
        {["TEXT", "NUMBER", "BOOLEAN", "FILE"].map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <Button type="submit" onClickHandler={() => {}}>
        Add new Question
      </Button>
    </form>
  );
};

export default NewQuestion;
