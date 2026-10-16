# Hello World — SPEC

Static single-page Hello World app (user chose "static page only"). No backend data, no auth.

- Route `/` → `frontend/src/pages/Home.tsx`
- Features (all client-side): monumental "HELLO WORLD." heading, language pills (English, Español, 日本語, Français, Python, Rust) switching the greeting line, "Ping the World" button (increments counter, adds terminal log line, shows sonner toast), "Copy Snippet" button (clipboard + toast), code card and stat tiles.
- Backend: untouched template (`/api/` returns `{"message":"Hello World"}`).
- No seed data, no credentials.
