from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal, engine
from . import models, service, schema
import logging

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


@router.post('/')
async def post_create_new_examination_items(
    db: Session = Depends(get_db), exam: schema.ExamInput = None
):
    # try:
        return service.create_new_examination(db, exam)
    # except:
    #     return HTTPException(400, {'message': 'Can\'t not process'})

@router.post('/seed/types')
async def seed_types_of_exams(db: Session = Depends(get_db)):
    return service.seed_types_of_examinations(db)