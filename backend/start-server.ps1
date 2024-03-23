Invoke-Expression '.\venv\Scripts\activate.ps1'
Invoke-Expression "uvicorn src.main:app --reload --port=3002"