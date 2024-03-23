from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .users.router import user_router
from .exams.router import exam_router

APP_NAME = 'Exam API'
APP_VERSION = '0.0.1'
APP_URL = 'http://localhost:3002'
APP_ALLOW_ORIGIN = 'http://localhost:5173'

app = FastAPI(
    title=APP_NAME,
    description=APP_NAME,
    version=APP_VERSION,
    contact={
        'name': APP_NAME,
        'url': APP_URL,
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[APP_ALLOW_ORIGIN],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(user_router)
app.include_router(exam_router)
app.mount("/files", StaticFiles(directory="uploads"), name="files")

@app.get('/')
async def root():
    return {'message': 'Exam API is running!',
            'status': 'success',
            'docs': {'docs': '/docs', 'redoc': '/redoc'}}
