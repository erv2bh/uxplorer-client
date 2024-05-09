import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AxiosResponse } from "axios";

import { userAtom } from "../atoms/atoms";
import { firebaseAuth } from "../app/firebaseAuth";

import fetchData from "../utils/axios";

interface UserInfo {
  email: string | null;
  username: string | null;
}

function usePostGoogleLogin(): {
  fetchGoogleLogin: () => void;
  isPending: boolean;
} {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const setUser = useSetAtom(userAtom);

  async function handleGoogleLogin(): Promise<AxiosResponse<any>> {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const userInfoObject: UserInfo = {
      email: result.user.email,
      username: result.user.displayName,
    };

    const response: AxiosResponse<any> = await fetchData("POST", "/auth/google", userInfoObject);

    return response;
  }

  const { mutate: fetchGoogleLogin, isPending } = useMutation<AxiosResponse<any>, Error, void>({
    mutationFn: handleGoogleLogin,
    onSuccess: (result) => {
      const { data } = result;
      setUser(data.userInfo);
      navigate("/dashboard");
    },
  });

  return { fetchGoogleLogin, isPending };
}

export default usePostGoogleLogin;
