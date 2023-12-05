from pydantic import BaseModel, EmailStr, validator, constr

class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    email: EmailStr
    password: constr(min_length=8, max_length=64)
    first_name: constr(min_length=2, max_length=64)
    last_name: constr(min_length=2, max_length=64)
    confirm_password: constr(min_length=8, max_length=64)

    # custom validator confirm password
    @validator('confirm_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError('passwords do not match')
        return v


class User(UserBase):
    id: str
    email: EmailStr
    password: str
    role: str
    birth_date: str
    first_name: str
    last_name: str
    phone: str
    address: str
    is_active: bool
    is_verified: bool
    created_at: str

    class Config:
        orm_mode = True