import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../utils/axios";

import Loading from "../components/shared/Loading";

function usePutTesterMission() {
  const { testerId, missionId } = useParams();

  async function updateMission(missionData) {
    const response = await fetchData(
      "PUT",
      `/testers/${testerId}/missions/${missionId}`,
      missionData,
    );

    return response;
  }

  const { mutate: updateMissionData, isLoading } = useMutation({
    mutationFn: updateMission,
  });

  if (isLoading) {
    return <Loading />;
  }

  return updateMissionData;
}

export default usePutTesterMission;
