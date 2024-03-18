import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { testerMissionsDataAtom } from "../atoms/atoms";

import Loading from "../components/shared/Loading";

function useGetAllMissions() {
  const { testerId } = useParams();

  const setTesterMissionsData = useSetAtom(testerMissionsDataAtom);

  async function getAllMissions() {
    const response = await fetchData("GET", `/testers/${testerId}/missions`);

    setTesterMissionsData(response.data);
    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getAllMissions"],
    queryFn: () => getAllMissions(),
    enabled: !!testerId,
  });

  if (isLoading) {
    return <Loading />;
  }

  return { data };
}

export default useGetAllMissions;
