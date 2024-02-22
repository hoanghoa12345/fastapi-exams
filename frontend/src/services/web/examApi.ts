import { api } from "../baseApi";

const apiPrefix = "/v1/exams";

export const ExamAPI = {
  getAll: () => api.get(apiPrefix),
  getById: (id: string) => api.get(`${apiPrefix}/${id}`),
};
