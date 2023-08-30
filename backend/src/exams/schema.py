from pydantic import BaseModel

class ExamInput(BaseModel):
    text: str
    images: str | None
    correctAnswer: str | None
    type: str
    parent_id: str


class AnswerInput(BaseModel):
    text: str
    is_correct: bool
    question_id: str