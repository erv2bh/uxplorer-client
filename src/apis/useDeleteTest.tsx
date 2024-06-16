import { useNavigate, useParams } from "react-router-dom";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import fetchData from "../utils/axios";

interface RouteParams {
  testId: string;
  userId: string;
}

function useDeleteTest() {
  const navigate = useNavigate();
  const { testId, userId } = useParams();

  async function deleteTest(): Promise<void> {
    await fetchData("DELETE", `/users/${userId}/tests/${testId}`);
  }

  const { mutate: fetchDeleteTest, isPending }: UseMutationResult<void, unknown, void, unknown> = useMutation({
    mutationFn: deleteTest,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  return { fetchDeleteTest, isPending };
}

export default useDeleteTest;
