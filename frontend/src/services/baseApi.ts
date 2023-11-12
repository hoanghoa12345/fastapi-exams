import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3002",
  timeout: 30 * 1000,
  headers: {
    accept: "application-json",
  },
});
