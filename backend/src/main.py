from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .users.router import user_router
from .exams.router import exam_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(user_router)
app.include_router(exam_router)


@app.get('/')
async def root():
    return {'message': 'Exam API',
            'status': 'success',
            'docs': {'docs': '/docs', 'redoc': '/redoc'}}
