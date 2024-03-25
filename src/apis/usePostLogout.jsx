import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { userAtom } from "../atoms/atoms";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setUser = useSetAtom(userAtom);

  async function handleGoogleLogout() {
    await fetchData("POST", "/auth/logout");
  }

  const { mutate: fetchLogout, isPending } = useMutation({
    mutationFn: handleGoogleLogout,
    onSuccess: () => {
      setUser("");
      queryClient.clear();
      navigate("/");
    },
  });

  return { fetchLogout, isPending };
}

export default useLogout;
