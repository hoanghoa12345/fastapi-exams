import { API_URL } from "@/utils/constants";
import { Cookies } from "@/utils/cookie";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30 * 1000,
  headers: {
    accept: "application-json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      Cookies.remove("token");
    }
    return Promise.reject(error);
  }
);
