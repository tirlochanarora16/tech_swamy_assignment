import { useStoreContext } from "../../store/store";
import Title from "../Title/Title";
import styles from "./styles.module.css";

const Answer = () => {
  const {} = useStoreContext();

  return (
    <div className={styles.answer}>
      <Title>Answer</Title>
    </div>
  );
};

export default Answer;
