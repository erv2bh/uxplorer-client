import axios from "axios";

const baseURL = import.meta.env.REACT_APP_BASE_URL;

function fetchData(method, url, data) {
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
