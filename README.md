# mypage — a terminal/IDE personal website

A personal website for Atif Usmani that looks like VS Code: a file explorer on
the left, a real interactive terminal in the editor area (with a typewriter
welcome message), and an opencode-style chat panel docked below.

## Structure

```
mypage/
├── frontend/     Vite + React + TypeScript + Tailwind v4 + xterm.js
└── backend/      FastAPI (Python) — chat API stub, wire an LLM here later
```

## Run it

Frontend (terminal UI):

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Backend (chat API) — in a second terminal:

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn main:app --reload --port 8000
```

The frontend dev server proxies `/api/*` to `http://localhost:8000`
(see `frontend/vite.config.ts`). The chat works without the backend too —
it just shows a friendly offline error.

## Where things live

| What | Where |
|---|---|
| Virtual filesystem (explorer + terminal + editor) | `frontend/src/data/filesystem.ts` |
| Welcome script that types out on boot | `WELCOME_SCRIPT` in `filesystem.ts` |
| Shell prompt (`$`) + commands | `frontend/src/components/TerminalView.tsx` |
| Chat panel UI | `frontend/src/components/ChatPanel.tsx` |
| Chat API / LLM wiring | `backend/main.py` (`POST /api/chat`) |
| Theme colors | `@theme` block in `frontend/src/index.css` |

## Notes

- Adding a project later: drop a folder/file into `FILESYSTEM` in
  `filesystem.ts` — the explorer, `ls`, `cat`, `tree` and the editor tabs all
  pick it up automatically.
- Hosting is not decided yet; the frontend is a standard static build
  (`npm run build`) so it deploys anywhere. The backend is a separate service.
