import Answer from "../Answer/Answer";
import AllQuestions from "../Question/AllQuestions";
import AllSurveys from "../Survey/AllSurveys";
import styles from "./styles.module.css";

const Page = () => {
  return (
    <section className={styles.section}>
      <div>
        <AllSurveys />
      </div>
      <div>
        <AllQuestions />
      </div>
      <div>
        <Answer />
      </div>
    </section>
  );
};

export default Page;
