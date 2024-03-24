from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.user import UserLogin, UserCreate, UserUpdate, UserResponse
from typing import Annotated
from fastapi import Depends

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email, password=hashed_password, role="user",
         first_name=user.first_name, last_name=user.last_name, is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_credential(db: Session, form_data: UserLogin):
    user = db.query(User).filter(User.email == form_data.email).first()
    if not user:
        return False
    if not verify_password(form_data.password, user.password):
        return False
    return user

def get_active_user(db: Session, user_id: str):
    user =db.query(User).filter(User.id == user_id, User.is_active == True).first()
    if user:
        return UserResponse.from_orm(user)
    return None

def update_user(db: Session, user_id: str, user: UserUpdate):
    db_user = db.query(User).filter(User.id == user_id).first()
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


def change_password(db: Session, user_id: str, password:str, new_password:str, confirm_password:str):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        if not verify_password(password, db_user.password):
            return None
        if new_password != confirm_password:
            return None
        db_user.password = get_password_hash(new_password)
        db.commit()
        db.refresh(db_user)
        return db_user
    return None


def reset_password(db: Session, user_id: str, new_password:str, confirm_password:str):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        if new_password != confirm_password:
            return None
        db_user.password = get_password_hash(new_password)
        db.commit()
        db.refresh(db_user)
        return db_user
    return None

