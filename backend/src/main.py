from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .users.router import user_router
from .exams.router import exam_router

app = FastAPI(
    title='Exam API',
    description='Exam API',
    version='0.0.1',
    contact={
        'name': 'Exam API',
        'url': 'http://localhost:3002',
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(user_router)
app.include_router(exam_router)
app.mount("/files", StaticFiles(directory="uploads"), name="files")

@app.get('/')
async def root():
    return {'message': 'Exam API',
            'status': 'success',
            'docs': {'docs': '/docs', 'redoc': '/redoc'}}
