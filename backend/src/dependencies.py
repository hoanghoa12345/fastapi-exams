from typing import Annotated
from fastapi import Header, HTTPException
from datetime import timedelta
from typing import Optional
from datetime import datetime
from jose import jwt, JWTError
import os
from load_dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
ACCESS_TOKEN_EXPIRE_DAYS = 30


# Demo get token header
async def get_token_header(x_token: Annotated[str, Header()]):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


# Demo get token query
async def get_query_token(token: str):
    if token != "jessica":
        raise HTTPException(status_code=400, detail="No Jessica token provided")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create access token
    :param data:
    :param expires_delta:
    :return:

    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_token(token: str):
    """
    Verify token
    :param token:
    :return:
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("sub")
        if id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
