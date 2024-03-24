from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import ValidationError
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.services import users as service
from app.models.user import User
from app.schemas.user import UserLogin, UserCreate, UserUpdate, User, UserItem
from app.db import get_db
from app.core.security import create_access_token, verify_token

router = APIRouter(
    prefix="/api/v1/users",
    tags=["users"],  # tag group on swagger
    responses={404: {"description": "Not found"}},
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{router.prefix}/login")


async def get_current_user(
    db: Annotated[Session, Depends(get_db)],
    token: Annotated[str, Depends(oauth2_scheme)],
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        user_id = verify_token(token)
        if not user_id:
            raise credentials_exception
        user = service.get_active_user(db, user_id)
        if not user:
            raise credentials_exception
        return user
    except Exception:
        raise credentials_exception


# Authentication
@router.post("/register", tags=["users"])
async def register_new_account(db: Session = Depends(get_db), user: UserCreate = None):
    """
    Register new account
    """
    return service.create_user(db, user)


@router.post("/login", tags=["users"])
async def login_account(
    db: Session = Depends(get_db),
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()] = None,
):
    """
    Login to account
    """
    try:
        user_request = UserLogin(email=form_data.username, password=form_data.password)
        user = service.get_user_by_credential(db, user_request)
        if not user:
            raise HTTPException(status_code=401, detail="Email or password not correct")
        access_token = create_access_token(data={"sub": user.id})
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user.email,
            "role": user.role,
        }
    except ValidationError as e:
        raise HTTPException(422, e.errors())


@router.get("/me", tags=["users"])
async def read_users_me(
    db: Session = Depends(get_db),
    token: Annotated[str, Depends(oauth2_scheme)] = None,
):
    """
    Get current user
    """
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthenticated")
    user = service.get_active_user(db, user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


@router.get("/users-all", response_model=list[UserItem], tags=["users"])
async def get_all_user(
    db: Session = Depends(get_db),
    current_user: Annotated[User, Depends(get_current_user)] = None,
):
    """
    Get all users
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=401, detail="Unauthorized")
    users = service.get_users(db, 0, 100)
    user_items: list[UserItem] = list()
    for user in users:
        item = UserItem(
            id=user.id,
            email=user.email,
            role=user.role,
            birth_date=user.birth_date,
            first_name=user.first_name,
            last_name=user.last_name,
            is_active=user.is_active,
            is_verified=user.is_verified,
            created_at=user.created_at,
        )
        user_items.append(item)

    return user_items


@router.put("/update", tags=["users"])
async def put_update_user(
    db: Session = Depends(get_db),
    current_user: Annotated[User, Depends(get_current_user)] = None,
    user: UserUpdate = None,
):
    """
    Update user
    """
    return service.update_user(db, user_id=current_user.id, user=user)


@router.patch("/change-password", tags=["users"])
async def change_password(
    db: Session = Depends(get_db),
    current_user: Annotated[User, Depends(get_current_user)] = None,
    password: str = None,
    new_password: str = None,
    confirm_password: str = None,
):
    """
    Change password
    """
    return change_password(
        db,
        user_id=current_user.id,
        password=password,
        new_password=new_password,
        confirm_password=confirm_password,
    )


@router.patch("/reset-password", tags=["users"])
async def reset_password(
    db: Session = Depends(get_db),
    user_id: str = None,
    new_password: str = None,
    confirm_password: str = None,
):
    """
    Reset user's password
    """
    return service.reset_password(
        db,
        user_id,
        new_password=new_password,
        confirm_password=confirm_password,
    )
