import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { userAtom } from "../atoms/atoms";

function useLogout(): {
  fetchLogout: () => void;
  isPending: boolean;
} {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setUser = useSetAtom(userAtom);

  async function handleGoogleLogout(): Promise<void> {
    await fetchData("POST", "/auth/logout");
  }

  const { mutate: fetchLogout, isPending } = useMutation<void, Error>({
    mutationFn: handleGoogleLogout,
    onSuccess: () => {
      setUser({});
      queryClient.clear();
      navigate("/");
    },
  });

  return { fetchLogout, isPending };
}

export default useLogout;
