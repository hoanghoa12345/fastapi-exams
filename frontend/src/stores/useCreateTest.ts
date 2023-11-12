import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import type {} from "@redux-devtools/extension";
import type { Exam, Part, QuestionGroup } from "@/types";
interface CreateTestState {
  currentExam: Exam | null;
  examId: string;
  parts: Part[];
  part: Part | null;
  partId: string;
  setCurrentExam: (exam: Exam) => void;
  setParts: (parts: Part[]) => void;
  setPart: (part: Part) => void;
  setPartId: (id: string) => void;
}

export const useCreateTestStore = create<CreateTestState>()(
  devtools((set) => ({
    currentExam: null,
    examId: "",
    parts: [],
    part: null,
    partId: "",
    setCurrentExam: (exam) => set({ currentExam: exam }),
    setParts: (parts) => set({ parts }),
    setPart: (part) => set({ part }),
    setPartId: (id) => set({ partId: id }),
  }))
);
