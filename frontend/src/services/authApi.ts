import { api } from "./baseApi";

export const authApi = {
  login: (formData: FormData) => api.post("/api/v1/users/login", formData),
  me: (token: string) => api.get("/api/v1/users/me", { headers: { Authorization: `Bearer ${token}` } }),
};