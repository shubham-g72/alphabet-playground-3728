# Hello World — SPEC

Single-page Hello World app. Greeting list + dispatch counter now served by a FastAPI backend (user chose "add a backend greeting API"). No auth.

## Frontend
- Route `/` → `frontend/src/pages/Home.tsx`
- Monumental "HELLO WORLD." heading; language pills (English, Español, 日本語, Français, Python, Rust) fetched from the backend and switching the greeting line.
- "Ping the World" button → POSTs to the dispatch API, increments a server-backed persistent counter, adds a terminal log line, shows a sonner toast.
- "Copy Snippet" button (clipboard + toast); code card and stat tiles (Client / Bundler / API=FastAPI / Status).
- Data layer: TanStack Query via `src/lib/api.ts` (apiGet/apiPost). Query keys: `["greetings"]`, `["greetings","stats"]` (invalidated after a dispatch).

## Backend (`/api`)
- `backend/routers/greetings.py`, models in `backend/models/greeting.py`.
- `GET /api/greetings` → list of greetings (backend is source of truth).
- `GET /api/greetings/stats` → `{ total }` (count of dispatches). Declared before the dynamic route.
- `GET /api/greetings/{id}` → one greeting, 404 if unknown.
- `POST /api/greetings/{id}/dispatch` → records a dispatch in Mongo `greeting_dispatches`, returns `{ total, greeting_id, dispatched_at }` (server-anchored UTC). 404 if id unknown.

## Data / seed
- Greeting list is a constant in the router (6 entries). Dispatches persist in Mongo `greeting_dispatches` collection. No credentials.
