import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import { missionsDataAtom, userAtom } from "../atoms/atoms";

function useGetTesterMissions(testerId, testId) {
  const missions = useAtomValue(missionsDataAtom);
  const missionIds = missions.map((mission) => mission._id);
  const { userId } = useAtomValue(userAtom);

  return useQuery({
    queryKey: ["testerMissions"],
    queryFn: async () => {
      if (missionIds.length === 0) {
        return [];
      }

      const response = await fetchData(
        "GET",
        `/users/${userId}/tests/${testId}/missions?missionIds=${missionIds.join(",")}&testerId=${testerId}`,
      );

      return response.data;
    },
    enabled: !!testerId && missionIds.length > 0,
  });
}

export default useGetTesterMissions;
