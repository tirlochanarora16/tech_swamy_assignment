import axios from "axios";
import { useEffect } from "react";
import { useStoreContext } from "../../store/store";
import { AllSurveys as AllSurveysType } from "../../types/surveys";
import Title from "../Title/Title";
import { API_URL, apiPaths } from "../api/api";
import SingleSurvey from "./SingleSurvey";
import styles from "./styles.module.css";

const AllSurveys = () => {
  const { setSurveys, surveys } = useStoreContext();

  const getSurveys = async () => {
    try {
      const response = await axios.get(`${API_URL}/${apiPaths.getSurveys()}`);

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      const surveys = response.data as AllSurveysType[];

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
      <button className={styles.survey_btn} type="button">
        Create Survey
      </button>
    </div>
  );
};

export default AllSurveys;
