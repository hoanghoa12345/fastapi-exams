from fastapi import APIRouter, Depends, HTTPException
from src.users.service import create_user, get_user, get_users
from src.users import models, schemas
from src.database import SessionLocal
from sqlalchemy.orm import Session

user_router = APIRouter(
    prefix="/api/v1/users",
    tags=["users"],  # tag group on swagger
    responses={404: {"description": "Not found"}},
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Authentication
@user_router.post("/register", tags=["users"])
async def register_new_account(
    db: Session = Depends(get_db), user: schemas.UserCreate = None
):
    """
    Register new account
    """
    return create_user(db, user)


@user_router.get("/users/me", tags=["users"])
async def read_user_me():
    return {"username": "fakecurrentuser"}


@user_router.get("/users/{username}", tags=["users"])
async def read_user(username: str):
    return {"username": username}


@user_router.get("/users/test/{user_id}", tags=["users"])
async def get_users_from_db(user_id: int, db: Session = Depends(get_db)):
    try:
        return get_user(db, user_id)
    except:
        raise HTTPException(422, "Error")


@user_router.get("/users-all/", tags=["users"])
async def get_all_user(db: Session = Depends(get_db)):
    return get_users(db, 0, 100)


@user_router.post("/users/create", tags=["users"])
async def create_user_r(db: Session = Depends(get_db), user: schemas.UserCreate = None):
    return create_user(db, user)
