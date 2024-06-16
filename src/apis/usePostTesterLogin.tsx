import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useSetAtom } from "jotai";
import { AxiosResponse } from "axios";
import fetchData from "../utils/axios";
import Loading from "../components/shared/Loading";

import { errorMessageAtom, testerAtom } from "../atoms/atoms";

interface LoginForm {
  id: string;
  password: string;
}

interface LoginResponse {
  data: {
    testerObjectId: string;
  };
}

function usePostTesterLogin() {
  const navigate = useNavigate();
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setTester = useSetAtom(testerAtom);

  async function handleTesterLogin({ id, password }: LoginForm): Promise<AxiosResponse<any>> {
    const testerInfo = {
      testerId: id,
      testerPassword: password,
    };
    const response = await fetchData("POST", "/auth/login", testerInfo);

    return response;
  }

  const { mutate: fetchTesterLogin, isPending } = useMutation<LoginResponse, any, LoginForm>({
    mutationFn: handleTesterLogin,
    onSuccess: (result) => {
      const { data } = result;

      setTester(data.testerObjectId);
      navigate(`/tester/${data.testerObjectId}`);
    },
    onError: (error) => {
      switch (error.response.status) {
        case 400:
          setErrorMessage("마감된 테스트입니다.");
          break;

        case 401:
          setErrorMessage("ID를 확인하세요.");
          break;

        case 403:
          setErrorMessage("이미 참여한 테스트입니다.");
          break;

        default:
          setErrorMessage("로그인에 실패했습니다.");
      }
    },
  });

  return { fetchTesterLogin, isPending };
}

export default usePostTesterLogin;
