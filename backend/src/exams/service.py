from sqlalchemy.orm import Session
from sqlalchemy import exc
from . import models, schema


def get_list_examination(db: Session):
    return db.query(models.Exam).all()


def create_new_examination(db: Session, exam: schema.ExamInput):
    type = db.query(models.Type).filter(models.Type.name == exam.type).first()
    if type:
        try:
            db_exam = models.Exam(
                text=exam.text,
                images=exam.images,
                correctAnswer=exam.correctAnswer,
                type_id=type.id,
                parent_id=exam.parent_id
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
