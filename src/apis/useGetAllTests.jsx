import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userAtom } from "../atoms/atoms";
import fetchData from "../utils/axios";

function useGetAllTests() {
  const { userId } = useAtomValue(userAtom);

  async function getTestList() {
    const response = await fetchData("GET", `/users/${userId}/tests`);

    return response.data.createdTests;
  }

  const { data: createdTests, isLoading } = useQuery({
    queryKey: ["getAllTests"],
    queryFn: () => getTestList(),
    enabled: !!userId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchIntervalInBackground: true,
  });

  return { createdTests, isLoading };
}

export default useGetAllTests;
