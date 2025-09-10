from pydantic import BaseSettings

class Settings(BaseSettings):
    api_base_url: str = "http://localhost:8080"
    frontend_origin: str = "http://localhost:5173"
    mongo_uri: str
    mongo_db: str = "propertydb"
    jwt_secret: str = "change_me"
    jwt_expires_min: int = 60
    google_client_id: str = ""
    google_client_secret: str = ""
    microsoft_client_id: str = ""
    microsoft_client_secret: str = ""
    oauth_redirect_url: str = "http://localhost:8080/auth/callback"

    class Config:
        env_file = ".env"

settings = Settings()
