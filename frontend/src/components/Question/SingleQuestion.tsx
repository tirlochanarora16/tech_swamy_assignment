import { Question } from "../../types/questions";
import { CiEdit } from "react-icons/ci";

import styles from "./style.module.css";
import { useStoreContext } from "../../store/store";

interface IProps {
  question: Question;
}

const SingleQuestion: React.FC<IProps> = ({ question }) => {
  const { setSelectedQuestion } = useStoreContext();

  const editQuestionHandler = (e: React.FormEvent<SVGElement>) => {
    e.stopPropagation();
  };

  const selectQuestionHandler = () => setSelectedQuestion(question);

  return (
    <div className={styles.singleQuestion} onClick={selectQuestionHandler}>
      <h2>{question.ques}</h2>
      <CiEdit cursor={"pointer"} fontSize={20} onChange={editQuestionHandler} />
    </div>
  );
};

export default SingleQuestion;
