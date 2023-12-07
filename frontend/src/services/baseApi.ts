import { API_URL } from "@/utils/constants";
import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30 * 1000,
  headers: {
    accept: "application-json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);
