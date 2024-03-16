import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  userAtom,
  currentTestDataAtom,
  currentTestTitleAtom,
  missionsDataAtom,
  testerEmailsDataAtom,
} from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetSingleTest() {
  const { userId } = useAtomValue(userAtom);
  const { testId } = useParams();

  const setCurrentTestData = useSetAtom(currentTestDataAtom);
  const setMissionsData = useSetAtom(missionsDataAtom);
  const setCurrentTestTitle = useSetAtom(currentTestTitleAtom);
  const setTesterEmailsDataAtom = useSetAtom(testerEmailsDataAtom);

  async function getSingleTest() {
    const response = await fetchData("GET", `users/${userId}/tests/${testId}`);

    setCurrentTestData(response.data.test);
    setCurrentTestTitle(response.data.test.title);
    setMissionsData(response.data.missions);
    setTesterEmailsDataAtom(response.data.testerEmailsAndIds);

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
