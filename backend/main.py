"""mypage chat backend.

A minimal FastAPI app that the frontend chat panel talks to.
The /api/chat endpoint is a stub — wire your LLM provider here later
(e.g. OpenAI, Anthropic, or a local model). The frontend contract:

    POST /api/chat
    { "message": "hello", "history": [{ "role": "user", "content": "..." }] }
    -> { "reply": "..." }

Run:
    .venv/bin/uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="mypage chat")

# Permissive for development; lock this down to your domain when hosting.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/chat")
def chat(req: ChatRequest) -> dict:
    # TODO: replace this stub with a real LLM call.
    # Keep the same response shape ({ "reply": "..." }) so the
    # frontend doesn't change.
    return {
        "reply": (
            f"[stub] you said: “{req.message}”.\n\n"
            "this is the placeholder reply from the backend — "
            "wire a real LLM provider in backend/main.py."
        ),
    }
