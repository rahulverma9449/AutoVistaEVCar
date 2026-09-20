import base64
import os
from typing import Literal
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from openai import OpenAI, OpenAIError
from pydantic import BaseModel, Field

load_dotenv()
app = FastAPI(title="Nova AI API", version="2.0.0", docs_url="/api/docs", openapi_url="/api/openapi.json")
app.add_middleware(CORSMiddleware, allow_origins=[os.getenv("CLIENT_ORIGIN", "http://localhost:5380")], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
SYSTEM_PROMPT = """You are Nova, a clear, safety-conscious AI assistant. Give accurate, practical answers and never invent facts or sources. Distinguish observations from inferences, state uncertainty, and encourage verification for important decisions. Never claim an image proves identity, intent, guilt, health status, or danger. For emergencies, tell the user to contact local emergency services. For medical, legal, or financial questions, give general information rather than professional diagnosis or advice."""

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=20000)
class Attachment(BaseModel):
    name: str = Field(max_length=255)
    mime: str = Field(max_length=100)
    data: str = Field(max_length=15_000_000)
class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=40)
    web_search: bool = True
    attachments: list[Attachment] = Field(default_factory=list, max_length=5)
class GenerateRequest(BaseModel):
    prompt: str = Field(min_length=3, max_length=32000)

@app.exception_handler(HTTPException)
async def http_error(_: Request, exc: HTTPException) -> JSONResponse:
    return JSONResponse(status_code=exc.status_code, content={"message": exc.detail})
def client() -> OpenAI:
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=503, detail="Add OPENAI_API_KEY to the project .env file and restart Nova.")
    return OpenAI()

@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "service": "nova-ai", "version": "2.0.0", "aiConfigured": bool(os.getenv("OPENAI_API_KEY"))}

@app.post("/api/chat")
def chat(payload: ChatRequest) -> dict:
    conversation = [item.model_dump() for item in payload.messages]
    if payload.attachments:
        content = [{"type": "input_text", "text": payload.messages[-1].content}]
        for attachment in payload.attachments:
            if attachment.mime.startswith("image/"):
                content.append({"type": "input_image", "image_url": attachment.data})
            elif attachment.mime == "application/pdf":
                content.append({"type": "input_file", "filename": attachment.name, "file_data": attachment.data})
            elif attachment.mime.startswith("text/"):
                raw = attachment.data.split(",", 1)[-1]
                decoded = base64.b64decode(raw).decode("utf-8", errors="replace")
                content.append({"type": "input_text", "text": f"File {attachment.name}:\n{decoded[:30000]}"})
        conversation[-1] = {"role": "user", "content": content}
    options = {"model": os.getenv("OPENAI_MODEL", "gpt-5"), "instructions": SYSTEM_PROMPT, "input": conversation, "store": False}
    if payload.web_search:
        options["tools"] = [{"type": "web_search"}]
    try:
        response = client().responses.create(**options)
        return {"answer": response.output_text, "model": response.model, "responseId": response.id}
    except OpenAIError as exc:
        raise HTTPException(status_code=502, detail=f"AI provider error: {exc}") from exc

@app.post("/api/generate/image")
def generate_image(payload: GenerateRequest) -> dict:
    try:
        result = client().images.generate(model=os.getenv("OPENAI_IMAGE_MODEL", "gpt-image-1"), prompt=payload.prompt, size="1024x1024")
        return {"image": f"data:image/png;base64,{result.data[0].b64_json}"}
    except OpenAIError as exc:
        raise HTTPException(status_code=502, detail=f"Image generation error: {exc}") from exc

@app.post("/api/generate/video")
def generate_video(payload: GenerateRequest) -> dict:
    try:
        video = client().videos.create(model=os.getenv("OPENAI_VIDEO_MODEL", "sora-2"), prompt=payload.prompt, seconds="4", size="1280x720")
        return {"id": video.id, "status": video.status, "progress": video.progress, "warning": "Video generation uses a deprecated API and may be unavailable for your account."}
    except (OpenAIError, AttributeError) as exc:
        raise HTTPException(status_code=502, detail=f"Video generation is unavailable: {exc}") from exc

@app.get("/api/generate/video/{video_id}")
def video_status(video_id: str) -> dict:
    try:
        video = client().videos.retrieve(video_id)
        return {"id": video.id, "status": video.status, "progress": video.progress}
    except (OpenAIError, AttributeError) as exc:
        raise HTTPException(status_code=502, detail=f"Could not retrieve video: {exc}") from exc
