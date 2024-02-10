import axios from "axios";
import { useEffect } from "react";
import { useStoreContext } from "../../store/store";
import { Survey } from "../../types/surveys";
import Button from "../Button/Button";
import Title from "../Title/Title";
import { API_URL, apiPaths } from "../api/api";
import SingleSurvey from "./SingleSurvey";
import styles from "./styles.module.css";

const AllSurveys = () => {
  const { setSurveys, surveys, selectedSurvey } = useStoreContext();

  const getSurveys = async () => {
    try {
      const response = await axios.get(`${API_URL}/${apiPaths.getSurveys()}`);

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      const surveys = response.data as Survey[];

      setSurveys(surveys);
    } catch (err: any) {
      console.log(err);
    }
  };

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
