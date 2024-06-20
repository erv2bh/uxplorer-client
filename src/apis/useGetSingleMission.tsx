import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { currentMission } from "../atoms/atoms";

interface Mission {
  description: string;
  expectedDuration?: number;
}

function useGetSingleMission() {
  const { testerId, missionId } = useParams();
  console.log(testerId);
  const setCurrentMission = useSetAtom(currentMission);

  async function getSingleMission() {
    const response = await fetchData(
      "GET",
      `/testers/${testerId}/missions/${missionId}`,
    );
    console.log(response.data);
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
