import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../utils/axios";

import Loading from "../components/shared/Loading";

function usePutTesterMission() {
  const { testerId, missionId } = useParams();

  async function updateMission(missionData: object) {
    const response = await fetchData(
      "PUT",
      `/testers/${testerId}/missions/${missionId}`,
      missionData,
    );

    return response;
  }

  const { mutate: updateMissionData, isPending } = useMutation({
    mutationFn: updateMission,
  });

  if (isPending) {
    return <Loading />;
  }

  return updateMissionData;
}

export default usePutTesterMission;
