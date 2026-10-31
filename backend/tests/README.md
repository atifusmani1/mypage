# Backend test scaffold — no tests installed

Plan schema/limit, stub/provider adapter, history/grounding, timeout/cancel/error, streaming and production-origin tests. Test provider calls with deterministic fakes, never paid live calls by default. pytest/httpx or other new tooling requires approval. Standard-library tests may be used where sufficient.

Health smoke command after backend changes: from backend run `.venv/bin/uvicorn main:app --port 8000`, then `curl http://localhost:8000/api/health`. See `docs/plans/acceptance-checklist.md` for release gates.
