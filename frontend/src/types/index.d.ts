export interface Exam {
  id: string;
  name: string;
  audio_file: string;
  type: string;
  duration: string;
  display_order: number;
  date: string;
  thumbnail_path: string;
  is_published: boolean;
  description: string;
  parts: Part[];
}

export interface Part {
  id: string;
  name: string;
  exam_id: string;
  question_groups: QuestionGroup[];
}

export interface QuestionGroup {
  id: string;
  part_id: string;
  name: string;
  image: string;
  paragraph: string;
  questions: Question[];
  group_index: string;
}

export interface Question {
  id: string;
  part_id: string;
  title: string;
  image: any;
  group_id: string;
  answers: Answer[];
  question_index: number;
}

export interface Answer {
  id: string;
  title: string;
  question_id: string;
  answer_index: number;
}

export interface QuestionGroupUpdate {
  question: string;
  questionId: string;
  answers: Answer[];
  correctAnswerIndex: number;
}
