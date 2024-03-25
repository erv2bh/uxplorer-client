import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { userAtom, surveyResultsAtom } from "../atoms/atoms";

function useGetSurveyResult() {
  const { userId } = useAtomValue(userAtom);
  const { testId } = useParams();

  const setSurveyResults = useSetAtom(surveyResultsAtom);

  async function getSurveyResult() {
    const response = await fetchData(
      "GET",
      `users/${userId}/tests/${testId}/surveys`,
    );
    setSurveyResults(response.data);

    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["surveyResult"],
    queryFn: () => getSurveyResult(),
  });

  return { data, isLoading };
}

export default useGetSurveyResult;
