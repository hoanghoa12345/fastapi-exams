import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface QuestionGroupState {
  questionGroupTitle: string;
}

export const useQuestionGroupStore = create<QuestionGroupState>()(
  devtools((set) => ({
    questionGroupTitle: "",
  }))
);
