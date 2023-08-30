from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import random
from models.item import Item
from typing import Annotated
from .users.router import router
from .exams.router import router as examRouter
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
app.include_router(router)
app.include_router(examRouter)

# First steps


@app.get('/')
async def root():
    return {'message': 'Hello World', 'status': 'success'}


@app.get('/random')
async def get_random():
    rn: int = random.randint(0, 100)
    return {'number': rn, 'limit': 100}


@app.get('/random/{limit}')
async def get_random_with_limit(limit: int):
    rn: int = random.randint(0, limit)
    return {'number': rn, 'limit': limit}


# Path parameters
@app.get('/items/{item_id}')
async def read_item(item_id: int):
    return {'item_id': item_id}


# Query parameters
@app.get("/items/")
async def get_item(skip: int = 0, limit: int = 10):
    items = [
        {'item_name': 'Foo'},
        {'item_name': 'Bar'},
        {'item_name': 'Baz'},
    ]
    return items[skip: skip + limit]


# Request body
@app.post('/items/')
async def create_item(item: Item):
    return item


# Query parameters and string validations
@app.get('/api/items/')
async def read_items_api(q: Annotated[str | None, Query(max_length=50)]):
    results = {
        'items': [
            {'item_id': 'Foo'},
            {'item_id': 'Bar'},
        ]
    }
    if q:
        results.update({'q': q})
    return results


@app.get('/api/welcome')
async def get_all_item():
    return {}
