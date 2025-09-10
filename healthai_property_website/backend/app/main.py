from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes_properties import router as prop_router
from app.auth.oauth import router as oauth_router

app = FastAPI(title="Property API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(oauth_router)
app.include_router(prop_router)

@app.get('/health')
def health():
    return {'ok': True}
