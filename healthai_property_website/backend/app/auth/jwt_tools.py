from datetime import datetime, timedelta, timezone
from jose import jwt
from app.core.config import settings

def create_session_jwt(sub: str, email: str, roles: list[str]):
    now = datetime.now(timezone.utc)
    payload = {
        'iss': settings.api_base_url,
        'iat': int(now.timestamp()),
        'exp': int((now + timedelta(minutes=settings.jwt_expires_min)).timestamp()),
        'sub': sub,
        'email': email,
        'roles': roles
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm='HS256')
