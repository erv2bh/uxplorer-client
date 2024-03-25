import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  userAtom,
  testDetailAtom,
  missionAtom,
  errorMessage,
} from "../atoms/atoms";
import Loading from "../components/shared/Loading";

function usePostTest() {
  const testDetail = useAtomValue(testDetailAtom);
  const missions = useAtomValue(missionAtom);
  const { userId } = useAtomValue(userAtom);
  const setErrorMessage = useSetAtom(errorMessage);
  const navigate = useNavigate();

  const payload = {
    ...testDetail,
    missions,
  };

  async function saveTest() {
    const response = await fetchData("POST", `/users/${userId}/tests`, payload);

    return response;
  }

  const { mutate: saveTestWithMissions, isLoading } = useMutation({
    mutationFn: saveTest,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.error || "테스트 생성에 실패했습니다.";
      setErrorMessage(message);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return saveTestWithMissions;
}

export default usePostTest;
