# VS Code workbench + OpenCode-style portfolio rebuild

Status: **planning/scaffold only; implementation not started**. Reviewed 2026-10-31 against baseline `f208230`. Product authority: [build-concept.md](../../build-concept.md). Implementation must not treat this plan as permission to add dependencies.

## 1. Approved direction and boundaries

The user approved reference organization, documentation updates, and documented future implementation folders, without runtime changes. They confirmed:

- Follow the supplied screenshots for workbench geometry and TUI message styling.
- Preserve JetBrains Mono, dark high contrast, and the fixed stack.
- Updated user clarification: `frontend/public/headshot.png` is the approved source for generating the ASCII portrait. No separate text-art submission is required. Keep the source at this working public URL; generate and visually review readable art during implementation. The empty `frontend/public/atif-ASCII.txt` is unused.
- This is a safe, read-only portfolio IDE, not host-shell access or a code execution platform.

The central visual correction is **a VS Code workbench containing a distinct OpenCode-like terminal application**, not a black page divided into generic chat cards. Existing right-aligned bubbles are superseded by the supplied reference. Website branding must not falsely imply an actual OpenCode backend or working provider connection.

## 2. Review coverage and evidence

Reviewed all 13 frontend source modules (App, main, index.css, seven components, filesystem, api, imageToAscii), backend/main.py and requirements, frontend package/lock/configuration files, HTML, template READMEs/assets, repo instructions/history, all four reference images, headshot and ASCII asset. Dependencies, virtualenv, generated output and secrets are excluded. Lockfile inspection is not a dependency-security audit.

Static findings are recorded in [codebase-audit.md](codebase-audit.md). No live-browser visual or assistive-technology audit was performed in this planning session. Build results are recorded separately in [verification.md](verification.md). Do not present a static review as verified browser behavior.

### Reference priority

1. [Opening/workbench screenshot](../references/page-opening-animation.png): activity rail, Explorer, editor-terminal above, integrated panel below, subtle rounded outer pane boundaries, one status bar.
2. [Conversation screenshot](../references/chat-TUI-example.png): wide left-aligned user block with cyan rail; unboxed assistant response; response metadata below; large shaded composer with cyan rail; context column on right.
3. [Embedded TUI screenshot](../references/opencode-embedded-panel.png): panel toolbar, multiline composer, mode/provider footer placement.
4. [Older contrast reference](../references/reference-dark-high-contrast-terminal.png): contrast intent only, not the new layout.

The opening image is a **static PNG**, not a timing reference. No animation duration can be inferred from it. Exact timing and the paragraph copy need approval in phase 0.

### External research applied

See [reference index](../references/README.md) for fetched URLs and limitations. VS Code documentation establishes separate Activity Bar, Primary Side Bar, Editor, Panel and Status Bar responsibilities. Its current default right-hand AI chat is not our layout: the user's bottom-panel screenshot wins. OpenCode V2 docs distinguish a full-screen TUI from its background service: imitating its UI does not require embedding that service. WAI splitter guidance informs keyboard sizing; xterm security guidance supports keeping the shell simulated.

## 3. Target visual specification

```text
Title bar / workspace identity                         layout controls
Activity | Explorer          | terminal tab / file tabs / actions
rail     | project tree      | +-------------------------------------+
         |                   | | ASCII portrait | introduction       |
         |                   | |                | paragraph + help  |
         |                   | | atif@mypage ~ $                     |
         |                   | +-------------------------------------+
         |                   | keyboard/pointer resize separator
         |                   | panel header: terminal / portfolio chat
         |                   | +------------------------+------------+
         |                   | | session title          | context    |
         |                   | | user block + cyan rail | title      |
         |                   | | assistant + metadata   | real usage |
         |                   | |                        | or unknown |
         |                   | | highlighted composer   |            |
         |                   | | mode/provider row      |            |
         |                   | | path / command hints   |            |
Single application status bar
```

### Tokens and geometry

- All final colors, fonts, spacing, pane sizes and density values go through `@theme` in index.css. Keep the documented xterm theme exception synchronized. No raw colors scattered through components.
- Separate workbench chrome, editor, Explorer, panel header, TUI canvas, TUI context and composer surfaces. Pure black everywhere currently erases hierarchy; contrast is not the same thing as identical backgrounds.
- Retain existing ink/accent/cyan/error roles; add semantic active-tab, hover, focus, composer and TUI-muted roles. Resolve undefined `green` utilities rather than introducing a second competing palette. Measure rendered alpha-composited colors, not just base tokens.
- Proposed desktop starting geometry, subject to screenshot review: 48px activity rail, 240–288px resizable Explorer, 32–36px pane toolbars, 22–24px global status bar, 1px structural separators, restrained outer-pane corner radius. Chat should initially receive roughly half the editor workspace rather than a fixed 300px that squeezes the composer. Encode approved values as tokens.
- Monospace remains project-wide. Use a small explicit scale for chrome, readable terminal/chat body and secondary metadata. Do not shrink portrait or input text until unreadable to preserve a screenshot arrangement. Touch composer text should avoid iOS input zoom.
- Workbench text stays neutral; green text and cyan rails distinguish the nested TUI. Preserve shared leading edges for user block, reply, composer and footer. Avoid pill bubbles, gradients, gratuitous borders and duplicate footers.
- Target text contrast ≥4.5:1, meaningful boundaries/focus ≥3:1. Do not copy inaccessible reference pixels literally.

### Responsive behavior

Measure content fit instead of blindly shrinking fixed panels. Hide the chat context column behind a labeled toggle first; collapse Explorer to an accessible drawer next. At narrow widths, prioritize the active terminal/file or chat pane with explicit view switching. Portrait and paragraph stack when their measured columns cannot fit. Re-clamp panel sizes after resize/orientation/font load; account for dynamic viewport height and mobile keyboard. Preserve user state when panes are hidden. Page must reflow at 320px and 200% zoom without trapping actions offscreen.

## 4. Execution phases

Each phase is a separately verified local Conventional Commit. Do not mix the API migration with a visual rewrite. Future source moves happen with their consumer/import updates, not as broken placeholder modules.

### Phase 0 — approve assets and reference baseline

**Prerequisites:** paragraph text (or visibly marked placeholder), animation timing decision, provider/hosting decisions only when backend phase starts. The source portrait is already supplied.

Tasks:
1. Generate static ASCII candidates from the supplied headshot: compare crop, luminance/contrast normalization, glyph density and character aspect ratio at the actual terminal font size. Review face/eye/glasses definition with the user; do not repeat the current unreviewed coarse runtime conversion. Produce full and compact variants if needed. Validate generated text is nonempty, free of ANSI/control sequences, has stable newline normalization and known row/column dimensions. Preserve spaces.
2. Capture current UI at 1440×900, 1280×800, 768×1024 and 375×812; include a 320px case and short landscape. Record font loading, browser and device scale. Capture boot, file view, initial chat, populated chat and collapsed panel.
3. Review a static workbench/composer comparison before animation or provider work. Approve token hierarchy and pane proportions.
4. Ask for animation cadence: proposed short line reveal for portrait, paragraph typing beside it, instant reduced-motion rendering, visible Skip/Replay controls. Do not invent timing from the PNG.

**Exit:** approved content/visual reference sheet; missing personal content visibly marked. Provider choice need not block frontend work.

### Phase 1 — workbench state and design foundations

**Files:** App.tsx, index.css, TitleBar, ActivityBar, Sidebar, EditorArea, StatusBar; future workbench/ui directories.

1. Introduce a shared workbench state boundary for active view, tabs, sidebar visibility/width, panel expanded/maximized state and focus requests. Prefer React reducer/context, not a new state dependency.
2. Repair token drift and create density/type/spacing roles. One global status bar; the TUI footer contains only session/path/command information.
3. Rebuild pane hierarchy matching the reference. Implement actual hide/show Explorer and chat actions. Decorative OS window dots are noninteractive; unsupported Run/Extensions/SCM actions are omitted or explicitly unavailable, never fake buttons.
4. Build a reusable accessible splitter with pointer capture, cancel/unmount cleanup, keyboard arrows/Home/End, separator name/value/orientation/controls, visible focus, and click-operated size presets. Preserve/restore pre-collapse dimensions.
5. Add skip navigation and named main/Explorer/terminal/chat regions. Responsive drawer has Escape dismissal and restored focus.

**Exit:** correct desktop hierarchy, one status bar, functional panel controls, no negative heights or clipping at target sizes; all interactions usable without drag or mouse.

### Phase 2 — recognizable ASCII introduction

**Files:** TerminalView, filesystem welcome data; future terminal boot/layout modules. Leave legacy imageToAscii removal until separately approved.

1. Load the reviewed, pre-generated text asset instead of converting the PNG in the browser. Use `frontend/public/portraits/` for generated variants once created; retain `frontend/public/headshot.png` as the source. The current photo has dark features that lose definition under the coarse brightness ramp; color alone cannot recover them. Any new conversion dependency needs approval first.
2. Format portrait rows and word-wrapped paragraph into padded terminal columns. Use actual terminal columns and font metrics; don't wrap the art itself. Stack when portrait + gap + readable paragraph cannot fit. Reserve enough initial upper-pane height to show the portrait meaningfully; tune final dimensions with the supplied art.
3. Define boot states loading → revealing → ready, plus skipped/error/disposed. Normalize CRLF in every branch, stop timers on cleanup, wait for font/terminal fit, and keep exactly one usable prompt. During boot, user input should skip/finish the intro and then be processed rather than interleaving with output.
4. Reduced motion shows the completed scene immediately and disables blinking/smooth auto-scroll. Missing/empty portrait shows an honest text fallback plus the introduction and prompt; never leave a blank terminal.
5. Provide a semantic text equivalent for the introduction and a concise portrait description without making screen readers announce hundreds of art glyphs. Validate xterm screen-reader mode and a nonterminal route to the same portfolio content.
6. Preserve terminal instance/history when switching tabs. Do not replay boot unexpectedly after resize; define explicit replay/reset action with clear history behavior.

**Exit:** user recognizes the portrait at normal zoom; paragraph appears beside it on desktop and below on narrow widths; reduced motion, asset failure and rapid navigation work. Human visual approval is required—tests cannot prove recognizability.

### Phase 3 — reproduce the TUI, not messaging bubbles

**Files:** ChatPanel and future chat components; API remains the labeled stub during visual work.

1. Separate panel chrome from TUI content: PanelHeader, ChatSessionHeader, ConversationLog, MessageBlock, ChatComposer, ChatContext, ChatFooter. Components remain one per file.
2. Build two faithful states: initial empty/welcome view with a prominent composer; populated transcript with left-aligned wide user blocks, cyan leading rail, plain assistant output and honest response metadata below.
3. Composer is a visibly highlighted rectangular surface spanning the conversation column: multiline textarea above a mode/provider row inside the same box. Cyan leading rail and distinct focus-within state. Footer hints/path live below, not between transcript and input.
4. Add native form submission, real Send/Stop controls, Shift+Enter newline, IME-safe Enter handling, accessible busy/error text and retained draft on failure. Remove unsupported provider-connect sales copy and fabricated usage/model labels. In demo mode display “Demo — provider not connected”; usage is unavailable, never a fake percentage.
5. Context column shows session title and real/unknown context usage; it is collapsible and optional on narrow screens. No duplicated app footer or progress bar unless backed by data and consistent with the reference.
6. Preserve scroll position while reading older replies; auto-follow only near the bottom. Add New messages action. Batch live announcements, honor reduced motion, wrap long words, and bound transcript rendering cost.

**Exit:** side-by-side reference review passes for block geometry, composer emphasis, metadata placement and context proportions; no fabricated capabilities; keyboard/mobile flows complete.

### Phase 4 — credible safe IDE interactions

**Files:** filesystem, terminal modules, editor/explorer/workbench components and command registry.

1. Fix filesystem root/home/relative resolution; separate bare `cd` from bare `ls`; reject inherited-property names and invalid traversal. Use one filesystem for Explorer, search, editor and terminal.
2. Extract shell command parsing/execution from xterm lifecycle. Cover all existing commands (`ls`, `cat`, `cd`, `tree`, `open`, `pwd`, `whoami`, `echo`, `date`, `history`, `clear`, `chat`, `help`, `sudo`). Choose one consistent simulated root/shell identity. Do not claim a live machine shell.
3. Repair Ctrl+C/L, wrapped input/history redraw, Unicode deletion, multiline paste and escape-sequence filtering. Add supported left/right/Home/End editing and file/command completion only with tests. Unsupported shell operators explain the limitation rather than execute anything.
4. Explorer: keyboard folder disclosures with expanded state, selection announcement, synchronized open files, meaningful empty state. Editor tabs: roving focus, arrows/Home/End, linked panels, visible close targets, close-to-neighbor focus; keep permanent terminal mounted.
5. Add Quick Open and command palette via a shared command registry; expose search across public virtual files and find within a file. Commands include focus chat, toggle sidebar/panel/context, resize presets, reset layout, clear chat (confirmation), replay introduction and help. All shortcuts also have pointer controls.
6. Scope shortcuts to the app and avoid swallowing typing/browser shortcuts globally. Resolve the screenshot's Ctrl+P chat command hint versus VS Code Quick Open explicitly by context; document platform modifiers and show only working hints.
7. Read-only editor may add breadcrumbs, copy and Markdown heading outline without a heavyweight editor dependency. Persist only non-sensitive layout/tab preferences with schema/version validation; transcript persistence requires a separate privacy decision. Optional file deep links use the native URL/history API and validate paths; never put chat text in URLs.

**Exit:** no inert advertised controls; commands and navigation agree on filesystem/state; no history loss across tabs; no host filesystem, shell or network access through commands.

### Phase 5 — resilient chat transport and real backend

**Blocked on:** provider/model, budget, hosting and consent/privacy copy. No SDK, database, limiter service or Markdown library without approval.

1. Keep `backend/main.py` as the uvicorn entry point; extract routes, schemas and services into the documented backend/app scaffold. Preserve `GET /api/health` and existing `POST /api/chat` `{message, history} → {reply}` compatibility while adding optional metadata. Do not silently replace the contract.
2. Define request limits: trimmed nonempty message, maximum bytes/chars and history length, user/assistant roles only, bounded complete turns. Backend owns system instructions and authoritative public content; ignore client claims about system messages, model identity and token usage.
3. Create provider interface plus explicit stub implementation. Real adapter reads secrets only server-side from env, handles connect/read deadlines, output limits, disconnect cancellation and safe upstream error mapping. No raw provider exceptions or secrets in UI/logs.
4. Add frontend runtime response validation, AbortController timeout/cancel, stable request/message IDs, retry of failed turns without duplicating history, and explicit idle/submitting/streaming/completed/cancelled/error states. Keep partial text on interrupted streams and offer retry.
5. Proposed optional `POST /api/chat/stream` uses fetch-readable SSE, preserving the JSON endpoint. Version/document events: start(requestId, truthful provider metadata), delta(text), usage(optional measured counts), done(finishReason), error(code, retryable). Test fragmented frames, UTF-8, disconnects and end-without-done. Never display hidden model reasoning as a “Thought” transcript.
6. Ground answers only in approved portfolio content. Keep `filesystem.ts` authoritative: propose a build-time export of public content consumed by the backend, with a version/hash freshness check, rather than a manually divergent second biography. Treat retrieved content/user prompts as untrusted data. Answers cite virtual file paths and admit missing information; placeholder claims remain placeholders. No RAG database is needed for this small corpus.
7. Metadata derives from actual provider response: model/provider, elapsed time, token counts/context capacity when available. If counts are estimates, label them; if unavailable, omit percentage/rate. Do not reuse screenshot values.
8. Before public paid traffic: per-client and global rate/concurrency/budget limits, maximum response tokens, bounded retries, body-size limits at edge/app, timeouts and cancellation. Configure trusted proxy handling deliberately; CORS is not rate limiting. Multi-worker deployments need a shared/edge limiter rather than a misleading per-process global budget.
9. Restrict production origins/methods; set same-origin reverse proxy or approved configurable API origin. Health indicates service liveness without exposing secrets; readiness can separately report provider availability. Add structured redacted errors/request IDs and operational metrics without storing visitor conversations or adding tracking.
10. Document visitor privacy, provider transmission and retention behavior before enabling real requests. No visitor API-key entry, auth or database is implied by the screenshot.

**Exit:** success/offline/timeout/422/429/5xx/cancel/invalid-response tests pass; truthful metadata; health curl passes; secrets absent from bundle/logs; quotas and production routing verified. Stub remains usable if provider is disabled.

### Phase 6 — release hardening and handoff

1. Introduce approved test tooling only after dependency consent. Candidate tools: Vitest/React Testing Library for TS/React, Playwright + axe for browser checks, pytest/httpx for API testing. These are proposals, not installed requirements. Use existing tooling and manual checks until approved.
2. Enable stricter TypeScript incrementally; run existing lint separately from build. Add CI only after test commands exist; pin reproducible backend dependency versions with an approved workflow.
3. Strengthen env-file ignore coverage without accidentally ignoring safe example documentation. Replace scaffold favicon/template docs only with approval. Check font licensing/loading, self-hosting option, content security policy, bundle cost and asset errors.
4. Execute [acceptance checklist](acceptance-checklist.md); run vendored web-design-guidelines on every changed UI file and fix real findings. Capture before/after reference comparisons and record manual screen-reader results.
5. Update source-of-truth docs and file map, commit scoped work locally, hand deployment/release control to user.

**Exit:** no unresolved blocking accessibility/security defects; user approves portrait and screenshot fidelity; deployment smoke test passes. No push, PR, tag or release by agent.

## 5. Feature coverage and intentional exclusions

| Surface | Required functional scope | Not implied / deferred |
|---|---|---|
| Workbench | resize/collapse/maximize, focus, layout restore, real toolbar actions | native OS window control, arbitrary docking engine |
| Explorer | browse/select/expand, public-file search, open editors | write/delete/upload host files |
| Editor | read-only text, line numbers, tabs, find/copy, optional headings | Monaco, language servers, editing, debugger |
| Terminal | supported virtual commands, editing/history/completion, safe paste | PTY, SSH, subprocess, package installation |
| Chat | multiline composer, streaming/stop/retry, grounded answers, clear session, honest context | coding agent tools, hidden reasoning, visitor provider keys |
| Problems/Output/Ports | only add if backed by real site diagnostics; otherwise omit/unavailable | fake problems, fake running servers, exposed ports |
| Source control | optional public source link when supplied | repository mutations or fabricated branch activity |
| Settings | layout/motion/accessibility preferences | multiple themes or tracking without approval |

## 6. Dependency order and decisions still open

Phase 0 → 1 → (2 and 3 can proceed independently) → 4 → 5 → 6. Backend contract design can proceed alongside visual work, but live provider integration waits for approval. Accessibility and responsive verification happen in every phase, not just at the end.

Open decisions: generated ASCII visual approval/dimensions/compact variant, introduction copy, precise boot timing, final token/proportion approval, provider/model/budget, hosting/origin/rate-limit architecture, privacy/retention, optional transcript persistence and new test dependencies. Keep unanswered choices marked blocked or proposed; do not guess personal facts or capabilities. The source headshot is supplied and is not a blocker. The starter favicon was removed at the user's request; no replacement logo is assumed.
