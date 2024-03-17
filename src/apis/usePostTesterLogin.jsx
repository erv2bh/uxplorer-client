import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import fetchData from "../utils/axios";
import Loading from "../components/shared/Loading";

function usePostTesterLogin() {
  const navigate = useNavigate();

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

      navigate(`/test/${data.testerObjectId}`);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return fetchTesterLogin;
}

export default usePostTesterLogin;
