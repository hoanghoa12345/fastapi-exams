from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db import Base, engine
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    email = Column(String(256), unique=True, index=True)
    password = Column(String(256))
    role = Column(String(50), nullable=False)
    birth_date = Column(Date, nullable=True)
    first_name = Column(String(256), nullable=True)
    last_name = Column(String(256), nullable=True)
    phone = Column(String(50), nullable=True)
    address = Column(String(550), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    verify_token = Column(String(36), nullable=True)
    created_at = Column(Date, nullable=True, default=datetime.now())

Base.metadata.create_all(engine)