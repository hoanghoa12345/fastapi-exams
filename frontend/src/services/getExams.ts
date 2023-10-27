import { api } from "./baseApi"

// export const getAllExams = async () => {
//   const { data } = await api.get('api/v1/exams')

//   return data
// }

export const ExamApi = {
  getAllExam: () => api.get('api/v1/exams'),
  getParts:(examId: string) => api.get(`api/v1/exams/${examId}/parts`),
  createPart:(examId: string, name: string) => api.post(`api/v1/exams/${examId}/parts?name=${name}`)
}
