import { useEffect, useState } from "react";
import { useStoreContext } from "../../store/store";
import Button from "../Button/Button";
import Title from "../Title/Title";

import Modal from "../Modal/Modal";
import NewQuestion from "./NewQuestion";
import SingleQuestion from "./SingleQuestion";
import styles from "./style.module.css";

const AllQuestions = () => {
  const { selectedSurvey, questions, getSurveyQuestions } = useStoreContext();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (selectedSurvey.id) {
      getSurveyQuestions();
    }
  }, [selectedSurvey]);

  return (
    <div className={styles.questions}>
      <Title>Questions</Title>
      <div className={styles.questions_container}>
        {!selectedSurvey.id && <p>Select a survey to see it's questions</p>}
        {selectedSurvey.id && questions.length === 0 && (
          <p>No Questions yet added to this survey</p>
        )}
        {selectedSurvey.id &&
          questions.length > 0 &&
          questions.map((question) => (
            <SingleQuestion key={question.id} question={question} />
          ))}
      </div>
      {selectedSurvey.id && (
        <Button onClickHandler={() => setShowModal(true)}>Add Question</Button>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <NewQuestion setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default AllQuestions;
