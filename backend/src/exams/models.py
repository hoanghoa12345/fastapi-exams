from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from ..database import Base, engine
from sqlalchemy.orm import relationship
import uuid


class Exam(Base):
    __tablename__ = "exams"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    name = Column(String(256))
    audio_file = Column(String(500))
    parts = relationship("Part", back_populates="exams")


class Part(Base):
    __tablename__ = "parts"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    exam_id = Column(String(36), ForeignKey("exams.id"), nullable=True)
    name = Column(String(56), nullable=True)
    exams = relationship("Exam", back_populates="parts")
    question_groups = relationship("QuestionGroup", back_populates="parts")


class QuestionGroup(Base):
    __tablename__ = "question_groups"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    part_id = Column(String(36), ForeignKey("parts.id"), nullable=True)
    parts = relationship("Part", back_populates="question_groups")
    questions = relationship("Question", back_populates="question_groups")


class Question(Base):
    __tablename__ = "questions"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    part_id = Column(String(36), ForeignKey("parts.id"), nullable=True)
    title = Column(String(256), nullable=True)
    image = Column(String(500), nullable=True)
    group_id = Column(String(36), ForeignKey("question_groups.id"), nullable=True)
    answers = relationship("Answer", back_populates="question")
    question_groups = relationship("QuestionGroup", back_populates="questions")


class Answer(Base):
    __tablename__ = "answers"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    title = Column(String(256), nullable=True)
    question_id = Column(String(36), ForeignKey("questions.id"), nullable=True)
    question = relationship("Question", back_populates="answers")

class CorrectAnswer(Base):

    __tablename__ = "correct_answers"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    question_id = Column(String(36), ForeignKey("questions.id"), nullable=True)
    answer_id = Column(String(36), ForeignKey("answers.id"), nullable=True)


Base.metadata.create_all(engine)
