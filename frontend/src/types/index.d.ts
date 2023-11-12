export interface Exam {
  id: string;
  name: string;
  audio_file: any;
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
}

export interface Question {
  id: string;
  part_id: string;
  title: string;
  image: any;
  group_id: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  title: string;
  question_id: string;
}
