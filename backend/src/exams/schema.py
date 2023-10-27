from pydantic import BaseModel
from typing import TypeVar, Generic, List, Optional, Union, Any, Dict, Tuple
from . import models
class ExamInput(BaseModel):
    name: str
    audio_file: str | None

class PartInput(BaseModel):
    name: str
    exam_id: str

class QuestionGroupInput(BaseModel):
    part_id: str


class QuestionInput(BaseModel):
    # part_id: str
    title: str
    image: str | None
    group_id: str

class AnswerInput(BaseModel):
   title: str

class AnswerSchema(BaseModel):
    id: str
    title: str
    question_id: str
    class Config:
        orm_mode = True


class QuestionSchema(BaseModel):
    id: str
    part_id: str
    title: str | None
    image: str | None
    group_id: str
    answers: List[AnswerSchema]
    class Config:
        orm_mode = True


class QuestionGroupSchema(BaseModel):
    id: str
    part_id: str
    questions: List[QuestionSchema]
    class Config:
        orm_mode = True

class PartSchema(BaseModel):
    id: str
    name: str
    exam_id: str
    question_groups: List[QuestionGroupSchema]
    class Config:
        orm_mode = True


class ExamSchema(BaseModel):
    id: str
    name: str
    audio_file: str | None
    parts: List[PartSchema]
    class Config:
        orm_mode = True



class ExamOutput(BaseModel):
    exam: ExamSchema
    part: PartSchema
    question: QuestionSchema
    class Config:
        orm_mode = True


