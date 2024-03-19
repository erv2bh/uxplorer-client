import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import fetchData from "../utils/axios";
import Loading from "../components/shared/Loading";

function usePostScreenRecord() {
  const { testerId } = useParams();

  async function saveScreenRecord(formData) {
    const response = await fetchData(
      "POST",
      `/testers/${testerId}/videourls`,
      formData,
    );

    return response;
  }

  const { mutate: saveScreenRecordData, isLoading } = useMutation({
    mutationFn: saveScreenRecord,
  });

  if (isLoading) {
    return <Loading />;
  }

  return saveScreenRecordData;
}

export default usePostScreenRecord;
