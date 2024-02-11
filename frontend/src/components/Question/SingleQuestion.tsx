import { CiEdit } from "react-icons/ci";
import {
  Question,
  QuestionInput,
  defaultQuestionInput,
} from "../../types/questions";

import { questionDefault, useStoreContext } from "../../store/store";
import Modal from "../Modal/Modal";
import styles from "./style.module.css";
import { useState } from "react";
import QuestionForm from "./QuestionForm";

interface IProps {
  question: Question;
}

const SingleQuestion: React.FC<IProps> = ({ question }) => {
  const { setSelectedQuestion } = useStoreContext();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formInput, setFormInput] =
    useState<QuestionInput>(defaultQuestionInput);

  const editQuestionHandler = (e: React.FormEvent<any>) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const selectQuestionHandler = () => setSelectedQuestion(question);

  const modalCloseHandler = () => {
    setShowModal(false);
    setSelectedQuestion(questionDefault);
  };

  return (
    <div className={styles.singleQuestion}>
      <div onClick={selectQuestionHandler}>
        <h2>{question.ques}</h2>
      </div>
      <div onClick={editQuestionHandler}>
        <CiEdit cursor={"pointer"} fontSize={20} />
      </div>
      <Modal open={showModal} onClose={modalCloseHandler}>
        <QuestionForm
          formInput={formInput}
          setFormInput={setFormInput}
          editQuestion={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
};

export default SingleQuestion;
