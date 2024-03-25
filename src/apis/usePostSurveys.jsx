import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../utils/axios";

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

  const { mutate: saveSurveyData, isPending } = useMutation({
    mutationFn: saveSurveys,
  });

  return { saveSurveyData, isPending };
}

export default usePostSurveys;
