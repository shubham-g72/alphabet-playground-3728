"""Greeting API — the backend is the source of truth for the greeting list and the
running count of greetings dispatched to the world."""

from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from lib.db import db
from models.greeting import DispatchResult, DispatchStats, Greeting

router = APIRouter(prefix="/greetings", tags=["greetings"])

# Source of truth for the greeting list (was hardcoded in the frontend).
GREETINGS: list[Greeting] = [
    Greeting(id="english", label="English", text="Hello, World!"),
    Greeting(id="spanish", label="Español", text="¡Hola, Mundo!"),
    Greeting(id="japanese", label="日本語", text="こんにちは 世界"),
    Greeting(id="french", label="Français", text="Bonjour le monde"),
    Greeting(id="python", label="Python", text='print("Hello, World!")', mono=True),
    Greeting(id="rust", label="Rust", text='println!("Hello, world!");', mono=True),
]
GREETING_INDEX: dict[str, Greeting] = {g.id: g for g in GREETINGS}


@router.get("", response_model=list[Greeting])
async def list_greetings() -> list[Greeting]:
    return GREETINGS


# Declared before the dynamic "/{greeting_id}" route so "stats" is not read as an id.
@router.get("/stats", response_model=DispatchStats)
async def dispatch_stats() -> DispatchStats:
    total = await db.greeting_dispatches.count_documents({})
    return DispatchStats(total=total)


@router.get("/{greeting_id}", response_model=Greeting)
async def get_greeting(greeting_id: str) -> Greeting:
    greeting = GREETING_INDEX.get(greeting_id)
    if greeting is None:
        raise HTTPException(status_code=404, detail="greeting not found")
    return greeting


@router.post("/{greeting_id}/dispatch", response_model=DispatchResult)
async def dispatch_greeting(greeting_id: str) -> DispatchResult:
    if greeting_id not in GREETING_INDEX:
        raise HTTPException(status_code=404, detail="greeting not found")
    now = datetime.now(timezone.utc)  # server-anchored, never the browser clock
    await db.greeting_dispatches.insert_one(
        {"greeting_id": greeting_id, "dispatched_at": now}
    )
    total = await db.greeting_dispatches.count_documents({})
    return DispatchResult(total=total, greeting_id=greeting_id, dispatched_at=now)
