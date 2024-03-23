# FastAPI
1. Start venv
```
.\venv\Scripts\activate.ps1
```
2.Start uvicorn
```
uvicorn main:app --reload --port=3002
```
3.Generate requirements file
```
pip freeze > requirements.txt
```

Generate alembic INI file:
```commandline
 alembic init alembic
```

Create new migrate
```commandline
alembic revision -m "add_new_part_index_column_parts_table"
```

Run migrate
```commandline
alembic upgrade head
```

