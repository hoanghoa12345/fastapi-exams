import { api } from "./baseApi";

export const ExamApi = {
  getAllExam: () => api.get("/v1/exams"),
  getExam: (examId: string) => api.get(`/v1/exams/${examId}`),
  getParts: (examId: string) => api.get(`/v1/exams/${examId}/parts`),
  getQuestionGroups: (partId: string) => api.get(`/v1/exams/${partId}/question-groups`),
  createExam: (data: any) => api.post(`/v1/exams`, data),
  createPart: (examId: string, name: string) => api.post(`/v1/exams/${examId}/parts?name=${name}`),
  createQuestionGroup: (partId: string, name: string) => api.post(`/v1/exams/question-groups`, { part_id: partId }),
  createQuestion: (formData: any) => api.post(`/v1/exams/questions`, formData),
  //Question group
  updateQuestionGroup: (questionGroupId: string, data: any) => api.put(`/v1/exams/question-groups/${questionGroupId}`, data),
  //Question
  updateQuestion: (questionId: string, data: any) => api.put(`/v1/exams/questions/${questionId}`, data),
};
