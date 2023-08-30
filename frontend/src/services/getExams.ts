import { api } from "./baseApi"

export const getAllExams = async () => {
  const { data } = await api.get('api/v1/exams')

  return data
}
