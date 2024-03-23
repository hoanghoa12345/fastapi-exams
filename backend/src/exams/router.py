from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.exams import models, service, schema
import logging

exam_router = APIRouter(
    prefix="/api/v1/exams",
    tags=['examinations'],  # tag group on swagger
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


@exam_router.get('/')
async def get_all_examinations_items(db: Session = Depends(get_db)):
    log = logging.getLogger(__name__)
    log.setLevel(logging.INFO)
    log.info('Get all examinations!')

    return db.query(models.Exam).filter(models.Exam.is_published == True).order_by(
        models.Exam.display_order.desc()).all()


@exam_router.get('/get-all')
async def get_all_examinations_items(db: Session = Depends(get_db)):
    return service.get_list_examination(db)


@exam_router.get('/{exam_id}')  # , response_model=schema.ExamSchema)
async def get_examination_by_id(exam_id: str, db: Session = Depends(get_db)):
    return service.get_examinations_by_exam_id(db, exam_id)


@exam_router.get('/{exam_id}/exam')
async def get_examination_by_id(exam_id: str, db: Session = Depends(get_db)):
    return service.get_examination_by_id(db, exam_id)


@exam_router.get('/{exam_id}/parts')
async def get_parts_by_exam_id(exam_id: str, db: Session = Depends(get_db)):
    return service.get_parts_by_exam_id(db, exam_id)


@exam_router.get('/{part_id}/question-groups')
async def get_question_groups_by_part_id(part_id: str, db: Session = Depends(get_db)):
    return service.get_question_groups_by_part_id(db, part_id)


@exam_router.post('/')
async def post_create_new_examination_items(
        db: Session = Depends(get_db), exam: schema.ExamInput = None
):
    # try:
    return service.create_new_examination(db, exam)


# except:
#     return HTTPException(400, {'message': 'Can\'t not process'})

@exam_router.post('/question-groups', tags=['Question Groups'])
async def post_create_new_question_groups(db: Session = Depends(get_db),
                                          question_group: schema.QuestionGroupInput = None):
    return service.create_new_question_group(db, question_group)


@exam_router.post('/{exam_id}/parts', tags=['Part'])
async def post_create_new_examination_items(exam_id: str, name: str, db: Session = Depends(get_db)):
    part = schema.PartInput(exam_id=exam_id, name=name)
    return service.create_new_part(db, part)


# Parts
@exam_router.get('/parts', tags=['Parts'])
async def get_all_parts(db: Session = Depends(get_db)):
    return service.get_all_parts(db)


@exam_router.post('/questions', tags=['Questions'])
async def post_create_new_question(db: Session = Depends(get_db),
                                   question: schema.QuestionInputGroup = None):
    return service.create_new_question(db, question)


@exam_router.put('/question-groups/{question_group_id}', tags=['Question Groups'])
async def update_question_group(db: Session = Depends(get_db), question_group_id: str = None,
                                data: schema.QuestionGroupUpdate = None):
    return service.update_question_group(db, question_group_id, data)


@exam_router.put('/questions/{question_id}', tags=['Questions'])
async def update_question(db: Session = Depends(get_db), question_id: str = None, data: schema.QuestionUpdate = None):
    return service.update_question_answer(db, question_id, data)
