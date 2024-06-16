import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { userAtom } from "../atoms/atoms";
import fetchData from "../utils/axios";

interface UserInfo {
  username?: string;
  userId?: string;
}

interface Tester {
  email: string;
}

interface Test {
  _id: string;
  title: string;
  testUrl: string;
  testers: Tester[];
  deadline: string;
}

function useGetAllTests(): {
  createdTests: Test[] | undefined;
  isLoading: boolean;
} {
  const { userId } = useAtomValue<UserInfo>(userAtom);

  async function getTestList(): Promise<Test[]> {
    const response = await fetchData("GET", `/users/${userId}/tests`);

    return response.data.createdTests;
  }

  const { data: createdTests, isLoading } = useQuery<Test[], Error>({
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
