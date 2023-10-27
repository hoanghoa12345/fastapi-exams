from sqlalchemy.orm import Session
from sqlalchemy import desc, exc
from . import models, schema
from fastapi.encoders import jsonable_encoder
from uuid import uuid4

def get_list_examination(db: Session):
    data = (
        db.query(
            models.Exam,
            models.Part,
            models.QuestionGroup,
            models.Question,
            models.Answer,
        )
        .join(models.Part, models.Part.exam_id == models.Exam.id)
        .join(
            models.QuestionGroup,
            models.QuestionGroup.part_id == models.Part.id,
            isouter=True,
        )
        .join(
            models.Question,
            models.Question.group_id == models.QuestionGroup.id,
            isouter=True,
        )
        .join(
            models.Answer, models.Answer.question_id == models.Question.id, isouter=True
        )
        .filter(models.Exam.id == "45bd1bae-a30b-4f7e-8da4-3b4cf48c1640")
        .all()
    )
    result = []
    for exam, part, question_group, question, answer in data:
        exam = jsonable_encoder(exam)
        part = jsonable_encoder(part)
        question_group = jsonable_encoder(question_group)
        question = jsonable_encoder(question)
        answer = jsonable_encoder(answer)
        result.append(
            {
                "exam": exam,
                "part": part,
                "question_group": question_group,
                "question": question,
                "answer": answer,
            }
        )
    
    return result 


def create_new_examination(db: Session, exam: schema.ExamInput):
    type = db.query(models.Type).filter(models.Type.name == exam.type).first()
    if type:
        try:
            db_exam = models.Exam(
                text=exam.text,
                images=exam.images,
                correctAnswer=exam.correctAnswer,
                type_id=type.id,
                parent_id=exam.parent_id,
            )
            db.add(db_exam)
            db.commit()
            db.refresh(db_exam)
            return db_exam
        except exc.SQLAlchemyError as error:
            raise error
    else:
        raise Exception("Type not found")


def seed_types_of_examinations(db: Session):
    db.add_all(
        [
            models.Type(name="Test"),
            models.Type(name="Part"),
            models.Type(name="Question"),
        ]
    )
    db.commit()
    return {"status": "Success", "error": None, "data": None}

def get_examinations_by_exam_id(db: Session, exam_id: str):
    exam_db = db.query(models.Exam).filter(models.Exam.id == exam_id).first()
    # exam_db = db.query(models.Exam).join(models.Part).filter(models.Exam.id == exam_id).order_by(models.Part.name.desc()).first()
    return schema.ExamSchema.from_orm(exam_db)

def get_parts_by_exam_id(db: Session, exam_id: str):
    part_db =db.query(models.Part).filter(models.Part.exam_id == exam_id).order_by(models.Part.name.asc()).all()
    part_db = [schema.PartSchema.from_orm(part) for part in part_db]
    return part_db

def get_question_groups_by_part_id(db: Session, part_id: str):
    return db.query(models.QuestionGroup).filter(models.QuestionGroup.part_id == part_id).all()

def get_questions_by_question_group_id(db: Session, question_group_id: str):
    return db.query(models.Question).filter(models.Question.group_id == question_group_id).all()

def get_answers_by_question_id(db: Session, question_id: str):
    return db.query(models.Answer).filter(models.Answer.question_id == question_id).all()

def create_new_part(db: Session, part: schema.PartInput):
    db_part = models.Part(
        id=uuid4(),
        name=part.name,
        exam_id=part.exam_id,
    )
    db.add(db_part)
    db.commit()
    db.refresh(db_part)
    return db_part

def create_new_question_group(db: Session, question_group: schema.QuestionGroupInput):
    db_question_group = models.QuestionGroup(
        id=uuid4(),
        part_id=question_group.part_id,
    )
    db.add(db_question_group)
    db.commit()
    db.refresh(db_question_group)
    return db_question_group
