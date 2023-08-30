type Part = {
  testPart: {
    name: string;
    items: Question[];
  };
};

type Question = {
  question: String;
  answers: String[];
};

export { Part, Question };
