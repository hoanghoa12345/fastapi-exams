from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
import logging

from app.db import get_db
from app.models.exam import Exam
from app.schemas.exam import (
    ExamInput,
    PartInput,
    QuestionGroupInput,
    QuestionInputGroup,
    QuestionGroupUpdate,
    QuestionUpdate,
)
from app.services import exams as service

router = APIRouter(
    prefix="/api/v1/exams",
    tags=["examinations"],  # tag group on swagger
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_all_examinations_items(db: Session = Depends(get_db)):
    log = logging.getLogger(__name__)
    log.setLevel(logging.INFO)
    log.info("Get all examinations!")

    return (
        db.query(Exam)
        .filter(Exam.is_published == True)
        .order_by(Exam.display_order.desc())
        .all()
    )


@router.get("/get-all")
async def get_all_examinations_items(db: Session = Depends(get_db)):
    return service.get_list_examination(db)


@router.get("/{exam_id}")  # , response_model=ExamSchema)
async def get_examination_by_id(exam_id: str, db: Session = Depends(get_db)):
    return service.get_examinations_by_exam_id(db, exam_id)


@router.get("/{exam_id}/exam")
async def get_examination_by_id(exam_id: str, db: Session = Depends(get_db)):
    return service.get_examination_by_id(db, exam_id)


@router.get("/{exam_id}/parts")
async def get_parts_by_exam_id(exam_id: str, db: Session = Depends(get_db)):
    return service.get_parts_by_exam_id(db, exam_id)


@router.get("/{part_id}/question-groups")
async def get_question_groups_by_part_id(part_id: str, db: Session = Depends(get_db)):
    return service.get_question_groups_by_part_id(db, part_id)


@router.post("/")
async def post_create_new_examination_items(
    db: Session = Depends(get_db), exam: ExamInput = None
):
    '''
    Create new examination
    '''
    try:
        return service.create_new_examination(db, exam)
    except:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={'message': 'Can\'t not process'})


# @router.post("/question-groups", tags=["Question Groups"])
# async def post_create_new_question_groups(
#     db: Session = Depends(get_db), question_group: QuestionGroupInput = None
# ):
#     return service.create_new_question_group(db, question_group)


# @router.post("/{exam_id}/parts", tags=["Part"])
# async def post_create_new_examination_items(
#     exam_id: str, name: str, db: Session = Depends(get_db)
# ):
#     part = PartInput(exam_id=exam_id, name=name)
#     return service.create_new_part(db, part)


# Parts
# @router.get("/parts", tags=["Parts"])
# async def get_all_parts(db: Session = Depends(get_db)):
#     return service.get_all_parts(db)


# @router.post("/questions", tags=["Questions"])
# async def post_create_new_question(
#     db: Session = Depends(get_db), question: QuestionInputGroup = None
# ):
#     return service.create_new_question(db, question)


# @router.put("/question-groups/{question_group_id}", tags=["Question Groups"])
# async def update_question_group(
#     db: Session = Depends(get_db),
#     question_group_id: str = None,
#     data: QuestionGroupUpdate = None,
# ):
#     return service.update_question_group(db, question_group_id, data)


# @router.put("/questions/{question_id}", tags=["Questions"])
# async def update_question(
#     db: Session = Depends(get_db),
#     question_id: str = None,
#     data: QuestionUpdate = None,
# ):
#     return service.update_question_answer(db, question_id, data)
