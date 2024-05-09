import axios, { AxiosResponse, Method } from "axios";

const baseURL: string | undefined = import.meta.env.VITE_BASE_URL;

function fetchData(method: Method, url: string, data?: any): Promise<AxiosResponse<any>> {
  const response = axios({
    method,
    url,
    data,
    baseURL,
    withCredentials: true,
  });

  return response;
}

export default fetchData;
