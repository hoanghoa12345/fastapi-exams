from pydantic import BaseModel
from typing import TypeVar, Generic, List, Optional, Union, Any, Dict, Tuple
from . import models


class ExamInput(BaseModel):
    name: str
    audio_file: str | None


class PartInput(BaseModel):
    name: str
    exam_id: str
    part_index: str | None


class QuestionGroupInput(BaseModel):
    part_id: str


class QuestionInput(BaseModel):
    part_id: str
    title: str
    image: str | None
    group_id: str


class AnswerInput(BaseModel):
    title: str
    question_id: str
    answer_index: int


class AnswerSchema(BaseModel):
    id: str
    title: str
    question_id: str
    answer_index: Optional[int]

    class Config:
        orm_mode = True


class QuestionSchema(BaseModel):
    id: str
    part_id: str
    title: str | None
    image: str | None
    group_id: str
    answers: List[AnswerSchema]
    question_index: Optional[int]

    class Config:
        orm_mode = True


class QuestionGroupSchema(BaseModel):
    id: str
    part_id: str
    name: str | None
    image: str | None
    paragraph: str | None
    questions: List[QuestionSchema]

    class Config:
        orm_mode = True


class PartSchema(BaseModel):
    id: str
    name: str
    exam_id: str
    part_index: int | None
    question_groups: List[QuestionGroupSchema]

    class Config:
        orm_mode = True


class ExamSchema(BaseModel):
    id: str
    name: str
    audio_file: str | None
    parts: List[PartSchema]
    type: Optional[str]
    date: Optional[str]
    duration: Optional[str]
    thumbnail_path: Optional[str]
    description: Optional[str]
    is_published: Optional[str]
    display_order: Optional[int]

    class Config:
        orm_mode = True


class ExamOutput(BaseModel):
    exam: ExamSchema
    part: PartSchema
    question: QuestionSchema

    class Config:
        orm_mode = True


class QuestionInputGroup(BaseModel):
    answers: List[str]
    correctAnswerIndex: int
    question: str
    part_id: str
    group_id: str | None
    image: str | None


class QuestionGroupUpdate(BaseModel):
    name: str | None
    image: str | None
    paragraph: str | None

class QuestionUpdate(BaseModel):
    title: str | None
    image: str | None
    group_id: str | None
    answers: List[AnswerSchema]
    correctAnswerIndex: int
    question: str
    image: str | None