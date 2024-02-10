import styles from "./styles.module.css";

interface IProps {
  id: string;
  title: string;
}

const SingleSurvey: React.FC<IProps> = ({ id, title }) => {
  return (
    <div className={styles.singleSurvey}>
      <h2>{title}</h2>
    </div>
  );
};

export default SingleSurvey;
