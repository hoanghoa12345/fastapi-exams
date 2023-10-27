from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from . import models, service, schema
import logging
from dataclasses import asdict

router = APIRouter(
    prefix="/api/v1/exams",
    tags=['examinations'], # tag group on swagger
    responses={404: {
        "description": "Not found"
    }}
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get('/')
async def get_all_examinations_items(db: Session = Depends(get_db)):
    log = logging.getLogger(__name__)
    log.setLevel(logging.INFO)
    log.info('Get all examinations!')

    return db.query(models.Exam).all()

@router.get('/get-all')
async def get_all_examinations_items(db: Session = Depends(get_db)):
    return service.get_list_examination(db)

@router.get('/{exam_id}', response_model=schema.ExamSchema)
async def get_examination_by_id(exam_id: str, db: Session = Depends(get_db)):
    return service.get_examinations_by_exam_id(db, exam_id)

@router.get('/{exam_id}/parts')
async def get_parts_by_exam_id(exam_id: str, db: Session = Depends(get_db)):
    return service.get_parts_by_exam_id(db, exam_id)

@router.post('/')
async def post_create_new_examination_items(
    db: Session = Depends(get_db), exam: schema.ExamInput = None
):
    # try:
        return service.create_new_examination(db, exam)
    # except:
    #     return HTTPException(400, {'message': 'Can\'t not process'})

@router.post('/question-groups', tags=['Question Groups'])
async def post_create_new_question_groups(db: Session = Depends(get_db), question_group: schema.QuestionGroupInput = None):
    return service.create_new_question_group(db, question_group)

@router.post('/seed/types')
async def seed_types_of_exams(db: Session = Depends(get_db)):
    return service.seed_types_of_examinations(db)

@router.post('/{exam_id}/parts', tags=['Part'])
async def post_create_new_examination_items( exam_id: str, name: str, db: Session = Depends(get_db)):
    part = schema.PartInput(exam_id=exam_id, name=name)
    return service.create_new_part(db, part)

