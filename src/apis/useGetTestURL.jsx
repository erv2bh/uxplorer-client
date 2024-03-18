import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetchData from "../utils/axios";
import Loading from "../components/shared/Loading";

function useGetTestUrl() {
  const { testerId } = useParams();

  async function getTestUrl() {
    const response = await fetchData("GET", `/testers/${testerId}/testurls`);

    return response.data.testUrl;
  }

  const { data: testUrl, isLoading } = useQuery({
    queryKey: ["testUrl", testerId],
    queryFn: () => getTestUrl(),
    enabled: !!testerId,
  });

  if (isLoading) {
    return <Loading />;
  }

  return { testUrl };
}

export default useGetTestUrl;
