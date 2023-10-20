from pydantic import BaseModel
from typing import TypeVar, Generic, List, Optional, Union, Any, Dict, Tuple
from . import models
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


class ExamSchema(BaseModel):
    id: str
    name: str
    audio_file: str | None


class PartSchema(BaseModel):
    id: str
    name: str
    exam_id: str


class QuestionSchema(BaseModel):
    id: str
    part_id: str
    title: str | None
    image: str
    group_id: str


class ExamOutput(BaseModel):
    exam: ExamSchema
    part: PartSchema
    question: QuestionSchema

