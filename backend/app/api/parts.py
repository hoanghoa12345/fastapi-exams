from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import uuid4

from app.db import get_db
from app.models.exam import Part
from app.schemas.exam import PartInput

router = APIRouter(
    prefix="/api/v1/parts",
    tags=["Parts"])


@router.get("/")
async def get_all_parts(db: Session = Depends(get_db)):
    return db.query(Part).all()

@router.get("/{part_id}")
async def get_part_by_id(part_id: str, db: Session = Depends(get_db)):
    return db.query(Part).filter(Part.id == part_id).first()

@router.post("/")
async def create_part(part: PartInput, db: Session = Depends(get_db)):
    db_part = Part(id=uuid4(), **part.dict())
    db.add(db_part)
    db.commit()
    db.refresh(db_part)
    return db_part

@router.put("/{part_id}")
async def update_part(part_id: str, part: PartInput, db: Session = Depends(get_db)):
    db_part = db.query(Part).filter(Part.id == part_id).first()
    if not db_part:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Part not found")
    db_part.name = part.name
    db_part.part_index = part.part_index
    db.commit()
    db.refresh(db_part)
    return db_part


@router.delete("/{part_id}")
async def delete_part(part_id: str, db: Session = Depends(get_db)):
    db_part = db.query(Part).filter(Part.id == part_id).first()
    if not db_part:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Part not found")
    db.delete(db_part)
    db.commit()
    return db_part