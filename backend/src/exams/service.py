from sqlalchemy.orm import Session
from sqlalchemy import exc
from . import models, schema
from fastapi.encoders import jsonable_encoder


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
        item = []
        item.append(exam)
        item.append(part)
        item.append(question_group)
        item.append(question)
        item.append(answer)
        result.append(item)

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
