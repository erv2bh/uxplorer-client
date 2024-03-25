import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { currentMission } from "../atoms/atoms";

function useGetSingleMission() {
  const { testerId, missionId } = useParams();

  const setCurrentMission = useSetAtom(currentMission);

  async function getSingleMission() {
    const response = await fetchData(
      "GET",
      `/testers/${testerId}/missions/${missionId}`,
    );

    setCurrentMission(response.data);
    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getSingleMission", missionId],
    queryFn: () => getSingleMission(),
    enabled: !!missionId,
  });

  return { data, isLoading };
}

export default useGetSingleMission;
