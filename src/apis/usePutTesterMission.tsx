import { useParams } from "react-router-dom";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";

import fetchData from "../utils/axios";

import Loading from "../components/shared/Loading";

interface Params {
  testerId?: string;
  missionId?: string;
}

interface MissionData {
  completed: boolean;
  createdAt: Date;
  completedAt: Date;
  duration?: number;
  feedback: string;
}

function usePutTesterMission(): UseMutateFunction<any, Error, MissionData, unknown> {
  const { testerId, missionId } = useParams();

  async function updateMission(missionData: MissionData) {
    const response = await fetchData(
      "PUT",
      `/testers/${testerId}/missions/${missionId}`,
      missionData,
    );

    return response;
  }

  const { mutate: updateMissionData } = useMutation({
    mutationFn: updateMission,
  });

  return updateMissionData;
}

export default usePutTesterMission;
