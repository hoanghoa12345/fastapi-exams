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


def get_user_by_credential(db: Session, form_data: schemas.UserLogin):
    user = db.query(models.User).filter(models.User.email == form_data.email).first()
    if not user:
        return False
    if not dependencies.verify_password(form_data.password, user.password):
        return False
    return user

def get_active_user(db: Session, user_id: str):
    user =db.query(models.User).filter(models.User.id == user_id, models.User.is_active == True).first()
    if user:
        user.password = "******"
        return user
    return None

def update_user(db: Session, user_id: str, user: schemas.UserUpdate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db_user.first_name = user.first_name
        db_user.last_name = user.last_name
        db_user.birth_date = user.birth_date
        db_user.phone = user.phone
        db_user.address = user.address
        db.commit()
        db.refresh(db_user)
        return db_user
    return None

