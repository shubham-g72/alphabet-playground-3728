from datetime import datetime

from pydantic import BaseModel

# TS mirror: `Greeting` in frontend/src/pages/Home.tsx — keep the two in sync.
class Greeting(BaseModel):
    id: str
    label: str
    text: str
    mono: bool = False


# TS mirror: `DispatchResult` in frontend/src/pages/Home.tsx.
class DispatchResult(BaseModel):
    total: int
    greeting_id: str
    dispatched_at: datetime


# TS mirror: `DispatchStats` in frontend/src/pages/Home.tsx.
class DispatchStats(BaseModel):
    total: int
