import { api } from "./baseApi";

export const ExamApi = {
  getAllExam: () => api.get("api/v1/exams"),
  getExam: (examId: string) => api.get(`api/v1/exams/${examId}`),
  getParts: (examId: string) => api.get(`api/v1/exams/${examId}/parts`),
  getQuestionGroups: (partId: string) => api.get(`api/v1/exams/${partId}/question-groups`),
  createExam: (data: any) => api.post(`api/v1/exams`, data),
  createPart: (examId: string, name: string) => api.post(`api/v1/exams/${examId}/parts?name=${name}`),
  createQuestionGroup: (partId: string, name: string) => api.post(`api/v1/exams/question-groups`, { part_id: partId }),
  createQuestion: (formData: any) => api.post(`api/v1/exams/questions`, formData),
};
