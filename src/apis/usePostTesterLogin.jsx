import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useSetAtom } from "jotai";

import fetchData from "../utils/axios";
import Loading from "../components/shared/Loading";

import { errorMessageAtom, testerAtom } from "../atoms/atoms";

function usePostTesterLogin() {
  const navigate = useNavigate();
  const setErrorMessage = useSetAtom(errorMessageAtom);
  const setTester = useSetAtom(testerAtom);

  async function handleTesterLogin({ id, password }) {
    const testerInfo = {
      testerId: id,
      testerPassword: password,
    };
    const response = await fetchData("POST", "/auth/login", testerInfo);

    return response;
  }

  const { mutate: fetchTesterLogin, isLoading } = useMutation({
    mutationFn: handleTesterLogin,
    onSuccess: (result) => {
      const { data } = result;

      setTester(data.testerObjectId);
      navigate(`/test/${data.testerObjectId}`);
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

  if (isLoading) {
    return <Loading />;
  }

  return fetchTesterLogin;
}

export default usePostTesterLogin;
