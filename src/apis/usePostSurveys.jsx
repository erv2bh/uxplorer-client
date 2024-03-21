import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../utils/axios";

import Loading from "../components/shared/Loading";

function usePostSurveys() {
  const { testerId } = useParams();

  async function saveSurveys(surveyResults) {
    const response = await fetchData(
      "POST",
      `/testers/${testerId}/surveys`,
      surveyResults,
    );

    return response;
  }

  const { mutate: saveSurveyData, isLoading } = useMutation({
    mutationFn: saveSurveys,
  });

  if (isLoading) {
    return <Loading />;
  }

  return saveSurveyData;
}

export default usePostSurveys;
