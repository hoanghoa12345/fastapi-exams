from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import uuid4

from app.db import get_db
from app.models.exam import QuestionGroup
from app.schemas.exam import QuestionGroupInput


router = APIRouter(
    prefix="/api/v1/question-groups",
    tags=["QuestionGroups"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get_all_question_groups(db: Session = Depends(get_db)):
    return db.query(QuestionGroup).all()


@router.get("/{question_group_id}")
async def get_question_group_by_id(question_group_id: str, db: Session = Depends(get_db)):
    return db.query(QuestionGroup).filter(QuestionGroup.id == question_group_id).first()


@router.post("/")
async def create_question_group(question_group: QuestionGroupInput, db: Session = Depends(get_db)):
    db_question_group = QuestionGroup(id=uuid4(), **question_group.dict())
    db.add(db_question_group)
    db.commit()
    db.refresh(db_question_group)
    return db_question_group


@router.put("/{question_group_id}")
async def update_question_group(question_group_id: str, question_group: QuestionGroupInput, db: Session = Depends(get_db)):
    db_question_group = db.query(QuestionGroup).filter(QuestionGroup.id == question_group_id).first()
    if not db_question_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question group not found")
    db_question_group.name = question_group.name
    db_question_group.part_id = question_group.part_id
    db.commit()
    db.refresh(db_question_group)
    return db_question_group


@router.delete("/{question_group_id}")
async def delete_question_group(question_group_id: str, db: Session = Depends(get_db)):
    db_question_group = db.query(QuestionGroup).filter(QuestionGroup.id == question_group_id).first()
    if not db_question_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question group not found")
    db.delete(db_question_group)
    db.commit()
    return db_question_group