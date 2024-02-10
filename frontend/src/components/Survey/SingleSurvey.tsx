import { questionDefault, useStoreContext } from "../../store/store";
import styles from "./styles.module.css";

interface IProps {
  id: string;
  title: string;
}

const SingleSurvey: React.FC<IProps> = ({ id, title }) => {
  const { setSelectedSurvey, setSelectedQuestion } = useStoreContext();

  const onClickHandler = () => {
    setSelectedSurvey({
      id,
      title,
    });
    setSelectedQuestion(questionDefault);
  };

  return (
    <div className={styles.singleSurvey} onClick={onClickHandler}>
      <h2>{title}</h2>
    </div>
  );
};

export default SingleSurvey;
