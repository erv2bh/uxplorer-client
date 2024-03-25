import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import {
  userAtom,
  testDetailAtom,
  missionAtom,
  errorMessageAtom,
} from "../atoms/atoms";

function usePostTest() {
  const testDetail = useAtomValue(testDetailAtom);
  const missions = useAtomValue(missionAtom);
  const { userId } = useAtomValue(userAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const navigate = useNavigate();

  const payload = {
    ...testDetail,
    missions,
  };

  async function saveTest() {
    const response = await fetchData("POST", `/users/${userId}/tests`, payload);

    return response;
  }

  const { mutate: saveTestWithMissions, isPending } = useMutation({
    mutationFn: saveTest,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      switch (error.response.status) {
        case 400:
          setErrorMessage("같은 테스트 이름이 존재합니다.");
          break;

        default:
          setErrorMessage("테스트 생성에 실패했습니다.");
      }
    },
  });

  return { saveTestWithMissions, loading: isPending };
}

export default usePostTest;
