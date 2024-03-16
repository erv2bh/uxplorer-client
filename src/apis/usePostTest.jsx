import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import fetchData from "../utils/axios";

import { userAtom, testDetailAtom, missionAtom } from "../atoms/atoms";
import Loading from "../components/shared/Loading";

function usePostTest() {
  const testDetail = useAtomValue(testDetailAtom);
  const missions = useAtomValue(missionAtom);
  const { userId } = useAtomValue(userAtom);
  const navigate = useNavigate();
  const payload = {
    ...testDetail,
    missions,
  };
  console.log(payload);
  async function saveTest() {
    const response = await fetchData("POST", `/users/${userId}/tests`, payload);
    // navigate("/dashboard");
    console.log("usePostTest: ", response);
    return response;
  }

  const { mutate: saveTestWithMissions, isLoading } = useMutation({
    mutationFn: saveTest,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return saveTestWithMissions;
}

export default usePostTest;
