from sqlalchemy.orm import Session, joinedload, subqueryload
from sqlalchemy import desc, asc
from . import models, schema
from fastapi.encoders import jsonable_encoder
from uuid import uuid4
from sqlalchemy.sql import text


def get_list_examination(db: Session):
    return db.query(models.Exam).order_by(models.Exam.display_order.desc()).all()


def create_new_examination(db: Session, exam: schema.ExamInput):
    db_exam = models.Exam(
        id=uuid4(),
        name=exam.name,
        audio_file=exam.audio_file,
    )
    db.add(db_exam)
    db.commit()
    db.refresh(db_exam)
    return db_exam


def get_examinations_by_exam_id(db: Session, exam_id: str):
    # exam_db = (
    #     db.query(models.Exam)
    #     .join(models.Part)
    #     .options(joinedload(models.Exam.parts))
    #     .filter(models.Exam.id == exam_id)
    #     .order_by(models.Part.part_index.asc())
    #     .first()
    # )
    #
    # return schema.ExamSchema.from_orm(exam_db)
    # exam_db = text("SELECT * FROM exams WHERE id = :id")

    # result = db.execute(exam_db, {"id": exam_id}).first()

    # convert dictionary to object
    # result = schema.ExamSchema.from_orm(result)
    #
    # return result
    exam_db = (
        db.query(models.Exam)
        .join(models.Part, models.Exam.parts)
        .join(models.QuestionGroup, models.Part.question_groups)
        .join(models.Question, models.QuestionGroup.questions)
        .join(models.Answer, models.Question.answers)
        .filter(models.Exam.id == exam_id)
        .order_by(models.Part.part_index.asc())
        .order_by(models.QuestionGroup.group_index.asc())
        .order_by(models.Question.question_index.asc())
        .order_by(models.Answer.answer_index.asc())
        .first()
    )

    return schema.ExamSchema.from_orm(exam_db)


def get_examination_by_id(db: Session, exam_id: str):
    return db.query(models.Exam).filter(models.Exam.id == exam_id).first()


def get_parts_by_exam_id(db: Session, exam_id: str):
    """
    Get exam full data by exam id
    :param db:
    :param exam_id:
    :return:
    """
    part_db = (
        db.query(models.Part)
        .filter(models.Part.exam_id == exam_id)
        .order_by(models.Part.name.asc())
        .all()
    )
    part_db = [schema.PartSchema.from_orm(part) for part in part_db]
    return part_db


def get_question_groups_by_part_id(db: Session, part_id: str):
    db_question_groups = (
        db.query(models.QuestionGroup)
        .filter(models.QuestionGroup.part_id == part_id)
        .all()
    )
    db_question_groups = [
        schema.QuestionGroupSchema.from_orm(question_group)
        for question_group in db_question_groups
    ]
    return db_question_groups


def get_questions_by_question_group_id(db: Session, question_group_id: str):
    return (
        db.query(models.Question)
        .filter(models.Question.group_id == question_group_id)
        .all()
    )


def get_answers_by_question_id(db: Session, question_id: str):
    return (
        db.query(models.Answer).filter(models.Answer.question_id == question_id).all()
    )


def create_new_part(db: Session, part: schema.PartInput):
    last_part = db.query(models.Part).order_by(models.Part.part_index.desc()).first()
    if last_part:
        part.part_index = last_part.part_index + 1
    else:
        part.part_index = 1
    db_part = models.Part(
        id=uuid4(), name=part.name, exam_id=part.exam_id, part_index=part.part_index
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


def get_all_parts(db: Session):
    return db.query(models.Part).all()


def create_new_answer(db: Session, answer: schema.AnswerInput):
    db_answer = models.Answer(
        id=uuid4(),
        question_id=answer.question_id,
        title=answer.title,
        answer_index=answer.answer_index,
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer


def create_new_question(db: Session, question: schema.QuestionInputGroup):
    if not question.group_id:
        group = create_new_question_group(
            db, schema.QuestionGroupInput(part_id=question.part_id)
        )
        group_id = group.id
    else:
        group_id = question.group_id
    if not question.image:
        question.image = None
    db_question = models.Question(
        id=uuid4(),
        group_id=group_id,
        title=question.question,
        image=question.image,
        part_id=question.part_id,
        question_index=0,
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)

    answers = []

    for index, answer in enumerate(question.answers):
        answer_input = schema.AnswerInput(
            question_id=db_question.id, title=answer, answer_index=index
        )
        new_answer = create_new_answer(db, answer_input)
        answers.append(new_answer)

    db_correct_answer = models.CorrectAnswer(
        question_id=db_question.id, answer_id=answers[question.correctAnswerIndex].id
    )
    db.add(db_correct_answer)
    db.commit()
    db.refresh(db_correct_answer)
    return [db_question, answers, db_correct_answer]


def update_question_group(
        db: Session, question_group_id: str, data: schema.QuestionGroupUpdate
):
    db_question_group = (
        db.query(models.QuestionGroup)
        .filter(models.QuestionGroup.id == question_group_id)
        .first()
    )
    if data.name:
        db_question_group.name = data.name
    if data.image:
        db_question_group.image = data.name
    if data.paragraph:
        db_question_group.paragraph = data.name
    db.commit()
    db.refresh(db_question_group)
    return db_question_group


def update_question_answer(db: Session, question_id: str, data: schema.QuestionUpdate):
    db_question = (
        db.query(models.Question).filter(models.Question.id == question_id).first()
    )
    if data.question:
        db_question.title = data.question
    if data.image:
        db_question.image = data.image
    if data.answers:
        # loop data.answers and update the answers
        for index, answer in enumerate(data.answers):
            if len(answer.id) > 0:
                print("update", answer.id)
                db.query(models.Answer).filter(models.Answer.id == answer.id).update(
                    {"title": answer.title, "answer_index": index}
                )
            else:
                # create new answer
                print("create new answer", answer.title, index)
                new_answer = create_new_answer(
                    db,
                    schema.AnswerInput(
                        question_id=question_id, title=answer.title, answer_index=index
                    ),
                )
                new_answer.id = uuid4()
                db.add(new_answer)
    db.commit()
    db.refresh(db_question)
    return db_question
