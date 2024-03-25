import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { userAtom } from "../atoms/atoms";
import { firebaseAuth } from "../app/firebaseAuth";

import fetchData from "../utils/axios";

function usePostGoogleLogin() {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const setUser = useSetAtom(userAtom);

  async function handleGoogleLogin() {
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const userInfoObject = {
      email: result.user.email,
      username: result.user.displayName,
    };

    const response = await fetchData("POST", "/auth/google", userInfoObject);

    return response;
  }

  const { mutate: fetchGoogleLogin, isPending } = useMutation({
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
