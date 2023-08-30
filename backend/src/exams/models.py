from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from ..database import Base, engine
from sqlalchemy.orm import relationship
import uuid


class Exam(Base):
    __tablename__ = "examinations"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    text = Column(String(256))
    answers = relationship("Answer")
    images = Column(String(256), nullable=True)
    correctAnswer = Column(String(256), nullable=True)
    type_id = Column(String(36), ForeignKey("types.id"), nullable=True)
    parent_id = Column(String(36), ForeignKey("examinations.id"), nullable=True)


class Type(Base):
    __tablename__ = "types"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    name = Column(String(56), nullable=True)


class Answer(Base):
    __tablename__ = "answers"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    text = Column(String(256), nullable=True)
    is_correct = Column(Boolean, default=False)
    question_id = Column(String(36), ForeignKey("examinations.id"))


Base.metadata.create_all(engine)
