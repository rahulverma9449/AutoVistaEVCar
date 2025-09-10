# Backend (FastAPI)
## Quick start (development)
1. cd backend
2. python -m venv .venv && source .venv/bin/activate
3. pip install -r requirements.txt  # or use pyproject.toml tooling
4. copy .env.example to .env and fill values
5. uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
