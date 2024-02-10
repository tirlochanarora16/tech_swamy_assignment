import { useEffect } from "react";
import { useStoreContext } from "../../store/store";
import Button from "../Button/Button";
import Title from "../Title/Title";
import SingleSurvey from "./SingleSurvey";
import styles from "./styles.module.css";
import { Dialog } from "@mui/material";

const AllSurveys = () => {
  const { surveys, getSurveys } = useStoreContext();

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

  return (
    <div className={styles.surveys}>
      <Title>Surveys</Title>
      <div className={styles.surveys_container}>
        {surveys.map((survey) => {
          return (
            <SingleSurvey key={survey.id} id={survey.id} title={survey.title} />
          );
        })}
      </div>
      <Button onClickHandler={() => {}}>Add Survey</Button>
    </div>
  );
};

export default AllSurveys;
