from fastapi import APIRouter, Request, Response, HTTPException
from authlib.integrations.starlette_client import OAuth
from starlette.responses import RedirectResponse
from app.core.config import settings
from app.db.mongo import db
from app.auth.jwt_tools import create_session_jwt

router = APIRouter(prefix="/auth", tags=["auth"])

oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.google_client_id,
    client_secret=settings.google_client_secret,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

oauth.register(
    name="microsoft",
    client_id=settings.microsoft_client_id,
    client_secret=settings.microsoft_client_secret,
    server_metadata_url="https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

@router.get('/login/{provider}')
async def login(provider: str, request: Request):
    if provider not in ('google','microsoft'):
        raise HTTPException(404, 'Unknown provider')
    redirect_uri = settings.oauth_redirect_url
    return await oauth.create_client(provider).authorize_redirect(request, redirect_uri)

@router.get('/callback')
async def callback(request: Request, response: Response):
    for provider in ('google','microsoft'):
        try:
            token = await oauth.create_client(provider).authorize_access_token(request)
            userinfo = token.get('userinfo') or {}
            email = userinfo.get('email')
            sub = userinfo.get('sub') or userinfo.get('oid')
            name = userinfo.get('name','')
            if not email or not sub:
                continue
            existing = await db.users.find_one({'provider': provider, 'provider_id': sub})
            if not existing:
                doc = {'email': email, 'name': name, 'provider': provider, 'provider_id': sub, 'roles':['user']}
                res = await db.users.insert_one(doc)
                user_id = str(res.inserted_id)
                roles = ['user']
            else:
                user_id = str(existing['_id'])
                roles = existing.get('roles', ['user'])
            jwt_token = create_session_jwt(user_id, email, roles)
            resp = RedirectResponse(url=f"{settings.frontend_origin}/")
            resp.set_cookie('session', jwt_token, httponly=True, secure=False, samesite='lax', max_age=3600, path='/')
            return resp
        except Exception:
            continue
    raise HTTPException(400, 'OAuth callback failed')
