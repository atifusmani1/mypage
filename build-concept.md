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
   with a `$` prompt. The target opening shows Atif's supplied ASCII portrait
   with an introduction paragraph to its right, then the usable prompt.
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

- Target boot: supplied ASCII portrait plus introduction paragraph alongside
  it on desktop, stacked when narrow. The user will provide the currently
  empty `frontend/public/atif-ASCII.txt`; do not invent a replacement.
  Introduction copy belongs in shared data. Exact reveal/typing timing awaits
  approval; the opening reference is a static PNG. Include skip/replay and an
  instant reduced-motion variant. Current runtime still converts headshot.png
  and does not display the welcome paragraph.
- Prompt: `atif@mypage $` (green user@host, cyan path, dim `$`).
- Commands: `ls`, `cat`, `cd`, `tree`, `open <file>` (opens editor tab),
  `pwd`, `whoami`, `echo`, `date`, `history`, `clear`, `chat`, `help`,
  `sudo` (easter egg), arrow-key history, Ctrl+C/L.
- The terminal and the explorer share one virtual filesystem
  (`frontend/src/data/filesystem.ts`). Adding content there updates the
  explorer, `ls`, `cat`, `tree`, and editor tabs automatically.

## 4. Chat behavior

- Target follows `docs/references/chat-TUI-example.png`: wide left-aligned
  user blocks with a cyan rail, plain assistant output with metadata below,
  a prominent highlighted multiline composer with mode/provider row inside,
  footer hints below, and a collapsible context column. This supersedes the
  old right-aligned bubble design. Metadata must be real or clearly unavailable.
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

## 7. Current state (runtime scaffold; rebuild planned)

Layout chrome, simulated terminal, chat panel, virtual filesystem and FastAPI
echo stub exist, but have known fidelity, behavior and accessibility gaps.
See `docs/plans/codebase-audit.md`; do not treat the scaffold as release-ready.
The 2026-10-31 planning pass organized references and added README-only future
module/test folders; it did not implement the redesign. See README for the map.

## 8. Roadmap (order matters)

Detailed execution order, dependencies, backend contract proposals and checks
live in `docs/plans/build-plan.md`. User-approved direction: supplied screenshots
govern geometry, JetBrains Mono/high contrast remain, and all IDE functionality
is a safe read-only portfolio simulation. Exact visual tokens and animation
timing still need review. No dependencies are approved by the plan itself.

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
- No host shell, arbitrary code execution, filesystem writes or visitor API-key
  collection. Unsupported IDE actions must not look functional.
- Placeholder content must stay visibly marked as placeholders — never
  fabricate real-looking links, emails, or project claims.
- Design choices serve the "feels like a real IDE" illusion but must remain
  accessible and usable for non-technical visitors.
