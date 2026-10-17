# build-concept.md — mypage: a terminal/IDE personal website

This is the product source of truth for the build. Any agent (or human) working
on this repo should read this first. Keep it current as decisions change.

## 1. Concept

A personal website for **Atif Usmani** that presents itself as a terminal /
IDE — a close visual fork of VS Code in the browser. It is dark-themed,
monospace-first, and is meant to feel like you're inside Atif's machine,
browsing his files and chatting with an assistant.

Two halves:

1. **An "internal operating system" feel** — the page opens to a live terminal
   with a `$` prompt. It boots by typing out a welcome script at a human pace.
2. **A chat assistant** — a white-label of the opencode terminal UI with
   Atif's own flavor, docked as a panel. This is the main feature.

The site is for everyone — explicitly not just developers
(`# NOTE: You don't need to know how to code to view this page`).

## 2. Layout (VS Code clone)

```
┌──────────────────────────────────────────────────────────┐
│ Title bar (traffic lights, "atifusmani — ~/mypage — bash")│
├───┬──────────────┬───────────────────────────────────────┤
│ A │  Explorer    │  Tab bar (terminal + opened files)     │
│ c │  sidebar     ├───────────────────────────────────────┤
│ t │  (file tree) │  Editor surface:                       │
│ i │              │   • the terminal (center, main)        │
│ v │              │   • read-only file views when clicked  │
│ i │              ├───────────────────────────────────────┤
│ y │              │  Chat panel (docked bottom, resizable) │
├───┴──────────────┴───────────────────────────────────────┤
│ Status bar (main · ~/mypage · bash · atifusmani.dev)      │
└──────────────────────────────────────────────────────────┘
```

- Left: activity bar (icon strip) + file explorer sidebar. Clicking a file
  opens it as an editor tab (read-only, line-numbered).
- Center: the opened "file" is the terminal. It stays mounted across tab
  switches so scroll/history are never lost.
- Bottom of editor: the chat panel — opencode-style, drag-to-resize,
  collapsible. `chat` command in the terminal focuses it.
- Bottom: status bar.

## 3. Terminal behavior

- Boot: types out `WELCOME_SCRIPT` (see `frontend/src/data/filesystem.ts`)
  per character with human pacing, then shows the prompt.
- Prompt: `atif@mypage $` (green user@host, cyan path, dim `$`).
- Commands: `ls`, `cat`, `cd`, `tree`, `open <file>` (opens editor tab),
  `pwd`, `whoami`, `echo`, `date`, `history`, `clear`, `chat`, `help`,
  `sudo` (easter egg), arrow-key history, Ctrl+C/L.
- The terminal and the explorer share one virtual filesystem
  (`frontend/src/data/filesystem.ts`). Adding content there updates the
  explorer, `ls`, `cat`, `tree`, and editor tabs automatically.

## 4. Chat behavior

- opencode-style: assistant replies in bordered blocks, user messages
  right-aligned, typing-dots while waiting, message history sent to backend.
- Backend: FastAPI stub (`backend/main.py`, `POST /api/chat`). A real LLM
  provider gets wired in later without changing the frontend contract.

## 5. Design language

- Dark theme only. JetBrains Mono everywhere.
- Palette lives in the `@theme` block of `frontend/src/index.css`
  (`--color-*` tokens); components reference tokens, not raw hex
  (exception: the xterm theme object in `TerminalView.tsx`).
- Accent: terminal green (`#4ade80`); secondary: amber.
- Motion: typewriter boot effect; respect `prefers-reduced-motion`.

## 6. Stack

- Frontend: Vite + React + TypeScript + Tailwind CSS v4 + xterm.js
- Backend: FastAPI (Python 3, venv in `backend/.venv`), stub chat endpoint
- Dev: `npm run dev` (frontend, :5173, proxies `/api` → :8000);
  `uvicorn main:app --reload --port 8000` (backend)

## 7. Current state (scaffold complete)

All layout chrome, terminal shell, chat panel, virtual filesystem, and the
FastAPI stub are built and verified end-to-end. See README "Where things
live" for the file map.

## 8. Roadmap (order matters)

1. **Design pass** — load the vendored skills (`frontend-design`,
   `better-ui`, `better-typography`, `better-colors`,
   `better-accessibility`, `better-layout`, `building-components`) and
   polish the scaffold; run `web-design-guidelines` review before sign-off.
2. **Real content** — Atif provides projects, bio, links; replace all
   placeholders in `filesystem.ts` and the chat greeting.
3. **LLM wiring** — swap the backend stub for a real provider (API key via
   env var; never committed).
4. **Hosting decision** — frontend is a static build (deploys anywhere);
   backend becomes a hosted service. Not decided yet.
5. **Audits** — accessibility + performance pass against the vendored
   guidelines.

## 9. Constraints

- Single-page app, no auth, no tracking.
- Placeholder content must stay visibly marked as placeholders — never
  fabricate real-looking links, emails, or project claims.
- Design choices serve the "feels like a real IDE" illusion but must remain
  accessible and usable for non-technical visitors.
