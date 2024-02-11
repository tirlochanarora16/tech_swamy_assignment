import { useEffect, useState } from "react";
import { questionDefault, useStoreContext } from "../../store/store";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Title from "../Title/Title";
import SingleSurvey from "./SingleSurvey";
import styles from "./styles.module.css";
import axios from "axios";
import { API_URL, apiPaths } from "../../api/api";
import Input from "../Input/Input";

const AllSurveys = () => {
  const { surveys, getSurveys, setSelectedQuestion, setSelectedSurvey } =
    useStoreContext();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [newSurveyValue, setNewSurveyValue] = useState<string>("");

  useEffect(() => {
    getSurveys();
  }, []);

  if (surveys.length === 0) {
    return (
      <div className={styles.surveys}>
        <Title>No Surveys yet created</Title>
      </div>
    );
  }

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${API_URL}/${apiPaths.createSurvey()}`,
        { title: newSurveyValue }
      );

      if (response.status !== 201) {
        throw new Error("Something went wrong");
      }

      alert("Survey added successfully!");
      resetStates();
    } catch (err: any) {
      throw err;
    }
  };

  const resetStates = () => {
    setNewSurveyValue("");
    setShowModal(false);
    getSurveys();
    setSelectedQuestion(questionDefault);
    setSelectedSurvey({ id: "", title: "" });
  };

  return (
    <div className={styles.surveys}>
      <Title>Surveys</Title>
      <div className={styles.surveys_container}>
        {surveys.length === 0 && <p>No Surveys added yet.</p>}
        {surveys.length > 0 &&
          surveys.map((survey) => {
            return (
              <SingleSurvey
                key={survey.id}
                id={survey.id}
                title={survey.title}
              />
            );
          })}
      </div>
      <Button onClickHandler={() => setShowModal(true)}>Add Survey</Button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={formSubmitHandler} className={styles.survey_form}>
          <Input
            type="text"
            placeholder="Enter Survey Title"
            value={newSurveyValue}
            onChange={(e) => setNewSurveyValue(e.target.value)}
          />
          <Button type="submit" onClickHandler={() => {}}>
            Add New Survey
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AllSurveys;
