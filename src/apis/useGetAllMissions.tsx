import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useSetAtom } from "jotai";

import fetchData from "../utils/axios";

import { testerMissionsDataAtom } from "../atoms/atoms";

import Loading from "../components/shared/Loading";

interface Mission {
  id: string;
}

function useGetAllMissions() {
  const { testerId } = useParams();

  const setTesterMissionsData = useSetAtom(testerMissionsDataAtom);

  async function getAllMissions() {
    const response = await fetchData("GET", `/testers/${testerId}/missions`);
    console.log(response.data);
    setTesterMissionsData(response.data);
    return response.data;
  }

  const { data, isLoading } = useQuery<Mission[]>({
    queryKey: ["getAllMissions"],
    queryFn: () => getAllMissions(),
    enabled: !!testerId,
  });

  return { data, isLoading };
}

export default useGetAllMissions;
