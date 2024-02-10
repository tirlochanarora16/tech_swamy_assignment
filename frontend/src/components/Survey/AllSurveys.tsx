import axios from "axios";
import { useEffect } from "react";
import Title from "../Title/Title";
import { API_URL, apiPaths } from "../api/api";
import styles from "./styles.module.css";
import { AllSurveys as AllSurveysType } from "../../types/surveys";

const AllSurveys = () => {
  const getSurveys = async () => {
    try {
      const response = await axios.get(`${API_URL}/${apiPaths.getSurveys()}`);

      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      const surveys = response.data as AllSurveysType[];

      if (surveys.length === 0) {
        return "No data";
      }

      return surveys;
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSurveys();
  }, []);

  return (
    <div className={styles.surveys}>
      <Title>Surveys</Title>
    </div>
  );
};

export default AllSurveys;
