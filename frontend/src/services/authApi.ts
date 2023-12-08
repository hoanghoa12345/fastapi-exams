import { UserRegister } from "@/types/user";
import { api } from "./baseApi";

export const authApi = {
  login: (formData: FormData) => api.post("/api/v1/users/login", formData),
  me: (token: string) => api.get("/api/v1/users/me", { headers: { Authorization: `Bearer ${token}` } }),
  register: (formData: UserRegister) => api.post("/api/v1/users/register", formData),
  update: (token: string, data: any) => api.put("/api/v1/users/update", data, { headers: { Authorization: `Bearer ${token}` } }),
};
