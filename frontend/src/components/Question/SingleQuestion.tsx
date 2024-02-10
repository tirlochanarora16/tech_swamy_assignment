import { Question } from "../../types/questions";
import { CiEdit } from "react-icons/ci";

import styles from "./style.module.css";

interface IProps {
  question: Question;
}

const SingleQuestion: React.FC<IProps> = ({ question }) => {
  return (
    <div className={styles.singleQuestion}>
      <h2>{question.ques}</h2>
      <CiEdit cursor={"pointer"} fontSize={20} />
    </div>
  );
};

export default SingleQuestion;
