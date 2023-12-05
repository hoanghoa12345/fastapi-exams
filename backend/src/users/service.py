from sqlalchemy.orm import Session
from . import dependencies

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = dependencies.get_password_hash(user.password)
    db_user = models.User(
        email=user.email, password=hashed_password, role="user",
         first_name=user.first_name, last_name=user.last_name, is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
