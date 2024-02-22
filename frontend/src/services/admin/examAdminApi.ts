import { api } from "../baseApi";

const apiPrefix = "/v1/exams";

export const ExamAdminAPI = {
  getAll: () => api.get(`${apiPrefix}/get-all`),
  getById: (id: string) => api.get(`${apiPrefix}/${id}`),
};
