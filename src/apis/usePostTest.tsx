import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { AxiosResponse, AxiosError } from "axios";
import fetchData from "../utils/axios";

import {
  userAtom,
  testDetailAtom,
  missionAtom,
  errorMessageAtom,
} from "../atoms/atoms";

interface TestDetail {
  testName: string;
  testDescription: string;
  testUrl: string;
  testerEmails: string[];
  testDeadline: string;
}

interface Mission {
  id: string;
  description: string;
  expectedDuration: string;
}

interface UserInfo {
  username?: string;
  userId?: string;
}

interface TestPayload {
  testName: string;
  testDescription: string;
  testUrl: string;
  testerEmails: string[];
  testDeadline: string;
  missions: Mission[];
}

function usePostTest() {
  const testDetail = useAtomValue<TestDetail>(testDetailAtom);
  const missions = useAtomValue<Mission[]>(missionAtom);
  const { userId } = useAtomValue<UserInfo>(userAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const navigate = useNavigate();

  const payload: TestPayload = {
    ...testDetail,
    missions,
  };

  async function saveTest(): Promise<AxiosResponse<any>> {
    const response = await fetchData("POST", `/users/${userId}/tests`, payload);

    return response;
  }

  const { mutate: saveTestWithMissions, isPending } = useMutation<any, AxiosError, TestPayload>({
    mutationFn: saveTest,
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage("같은 테스트 이름이 존재합니다.");
            break;

          default:
            setErrorMessage("테스트 생성에 실패했습니다.");
        }
      }
    },
  });

  return { saveTestWithMissions, loading: isPending };
}

export default usePostTest;
