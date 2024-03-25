import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../utils/axios";

function useDeleteTest() {
  const navigate = useNavigate();
  const { testId, userId } = useParams();

  async function deleteTest() {
    await fetchData("DELETE", `/users/${userId}/tests/${testId}`);
  }

  const { mutate: fetchDeleteTest, isPending } = useMutation({
    mutationFn: deleteTest,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  return { fetchDeleteTest, isPending };
}

export default useDeleteTest;
