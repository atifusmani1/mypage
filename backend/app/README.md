# Backend application scaffold — not implemented

Phase 5 destination for `routes/` (health/chat), `schemas/` (bounded requests/events), `services/` (provider/stub, public context, budgets) and configuration. Create actual packages/files when extracting tested code, not empty Python stubs now.

`backend/main.py` remains the working uvicorn entry point and existing routes remain unchanged. Preserve JSON compatibility; optional streaming is additive. Provider credentials stay server-side in environment variables. No shell execution or visitor key collection.
