# AGENTS.md — rules for any agent working in this repo

Product intent lives in `build-concept.md` — read it before making decisions.
This file covers the always-on engineering rules.

## Project

Personal website for Atif Usmani: a VS Code–style terminal/IDE in the browser
with an opencode-style chat assistant. Dark theme, monospace-first.

## Stack (fixed — do not change without approval)

- Frontend: `frontend/` — Vite + React 19 + TypeScript + Tailwind CSS v4 + xterm.js
- Backend: `backend/` — FastAPI (Python), chat stub in `main.py`
- Node is installed via Homebrew as `node@22`.

## Layout of the repo

- `frontend/src/components/` — one React component per file
- `frontend/src/data/filesystem.ts` — the virtual filesystem (single source
  of truth for explorer, terminal commands, and editor tabs)
- `frontend/src/lib/` — API clients
- `frontend/src/index.css` — `@theme` design tokens (the only place colors
  are defined; the xterm theme object in `TerminalView.tsx` is the
  documented exception)
- `.opencode/skills/` — vendored design-standard skills (see
  `.opencode/skills/SOURCES.md` for provenance)
- `.opencode/agents/` — agent definitions
- `build-concept.md` — product spec; keep it current

## Commands

```bash
cd frontend && npm run dev        # UI at :5173 (proxies /api → :8000)
cd frontend && npm run build      # tsc + vite — must pass before any commit
cd backend && .venv/bin/uvicorn main:app --reload --port 8000
curl http://localhost:8000/api/health   # backend check
```

## Rules

1. **Commits**: small, scoped, Conventional Commits (`feat:`, `fix:`,
   `style:`, `docs:`, `chore:`). Local commits only — never push, never
   open PRs, never publish. The user publishes.
2. **Never** rewrite git history, commit secrets or `.env` files, or
   commit `node_modules/` / `.venv/` / `dist/`.
3. **New dependencies require explicit user approval** first.
4. **Design tokens only** — components reference `@theme` tokens, not raw
   hex (exception: xterm theme object).
5. **Accessibility is a gate, not a nicety**: semantic HTML, keyboard
   support, visible focus, `prefers-reduced-motion`, contrast.
6. **Verify before "done"**: `npm run build` must pass; for UI changes run
   the dev server and confirm visually; for backend changes hit
   `/api/health`.
7. **UI work**: consult the relevant vendored skills first; run
   `web-design-guidelines` review before signing off UI tasks.
8. **Placeholders stay placeholders** — clearly marked; never fabricate
   real personal data, links, or project claims.
9. **Ask before** destructive operations, stack changes, or deleting files
   you didn't create in the current session.
10. Keep the README "Where things live" table and `build-concept.md`
    accurate as the build evolves.
