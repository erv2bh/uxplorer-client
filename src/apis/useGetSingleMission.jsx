import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { currentMission } from "../atoms/atoms";

import Loading from "../components/shared/Loading";

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

  if (isLoading) {
    return <Loading />;
  }

  return { data };
}

export default useGetSingleMission;
