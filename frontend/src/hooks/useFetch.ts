import { API_URL } from "@/utils/constants";
import { useEffect, useState } from "react";

const baseUrl = API_URL;


export function useFetch<T=unknown>(url: string, method: string = "GET") {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  useEffect(() => {
    fetch(`${baseUrl}${url}`, {
      method: method,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  return { isLoading, data, error };
};
