import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  userAtom,
  currentTestDataAtom,
  currentTestTitleAtom,
  missionsDataAtom,
  testerDataAtom,
  completedMissionDataAtom,
  completedMissionCountAtom,
  completedTesterAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetSingleTest() {
  const { userId } = useAtomValue(userAtom);
  const { testId } = useParams();

  const setCurrentTestData = useSetAtom(currentTestDataAtom);
  const setMissionsData = useSetAtom(missionsDataAtom);
  const setCurrentTestTitle = useSetAtom(currentTestTitleAtom);
  const setTesterDataAtom = useSetAtom(testerDataAtom);
  const setCompletedMissionCount = useSetAtom(completedMissionCountAtom);
  const setCompletedMissionData = useSetAtom(completedMissionDataAtom);
  const setCompletedTester = useSetAtom(completedTesterAtom);

  async function getSingleTest() {
    const response = await fetchData("GET", `users/${userId}/tests/${testId}`);

    const totalMissions = response.data.missions.length;
    const completedTesters = response.data.loggedInTesters.length;
    const totalCompletedMissionsCount = totalMissions * completedTesters;
    const completedMissionsCount = response.data.completedMission.length;

    setCompletedTester(response.data.loggedInTesters);
    setCompletedMissionCount({
      completedMissionsCount,
      totalCompletedMissionsCount,
    });
    setCompletedMissionData(response.data.completedMission);
    setCurrentTestData(response.data.test);
    setCurrentTestTitle(response.data.test.title);
    setMissionsData(response.data.missions);
    setTesterDataAtom(response.data.testerData);

    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["singleTest"],
    queryFn: () => getSingleTest(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  return { data };
}

export default useGetSingleTest;
