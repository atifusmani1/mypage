# Baseline codebase audit

Baseline: `f208230`, 2026-10-31. Static inspection; line numbers refer to the pre-rebuild source. Findings are planned work, **not fixed**. The two new screenshots and empty ASCII file were untracked on arrival. No secrets/dependency source was inspected.

| Priority | Evidence | Finding / required action |
|---|---|---|
| High | `frontend/src/index.css:9-14` | Editor, chrome and status share black; establish reference-based surface hierarchy. |
| High | `frontend/src/components/ChatPanel.tsx:93-245`; `index.css:22` | `green` utilities lack a matching unnumbered theme token; use semantic accent/TUI roles and inspect generated styles. |
| High | `TerminalView.tsx:76`; `lib/imageToAscii.ts:18,38-39` | Portrait is 64-column runtime conversion with fixed aspect correction and coarse average-brightness ramp; ignores user ASCII source. Dark facial detail loses density. Needs supplied text and human recognition check. |
| High | `frontend/public/atif-ASCII.txt` | Empty file; portrait delivery is blocked on user content. Preserve it. |
| High | `TerminalView.tsx:69-97`; `data/filesystem.ts:17-22` | Welcome script unused; no paragraph beside portrait. Documentation previously described obsolete behavior. |
| High | `ActivityBar.tsx:35`; `Sidebar.tsx:66`; `ChatPanel.tsx:205` | Fixed 48px + 288px primary navigation and 320px nested context pane break narrow layouts. |
| High | `ChatPanel.tsx:41-55,88-94` | Mouse-only 4px resize/double-click collapse; invalid clamps at short heights; collapsed chrome exceeds 36px. Keyboard/pointer alternatives required (WCAG 2.1.1, 2.5.7). |
| High | `ChatPanel.tsx:133,149,167-198` | Bubbles/rails/metadata/composer structure diverge from supplied TUI. Highlighted multiline composer is missing. |
| High | `ChatPanel.tsx:171-177,213-245` | Hardcoded model, tokens, percentage, shortcut and inert Connect provider falsely imply live capabilities. |
| High | `EditorArea.tsx:60` | Invisible close control: group-hover has no group parent and no focus opacity override. |
| High | `data/filesystem.ts:90,104-108`; `TerminalView.tsx:121` | Inherited object keys accepted; absolute/home paths become relative; bare ls resets to root. Add own-key/type guards and command-specific defaults. |
| Medium | `ActivityBar.tsx:37,62`; `ChatPanel.tsx:98,109,227,240` | Activity/account/panel/connect/dismiss controls are inert. Wire supported behaviors or clearly remove/disable. |
| Medium | `ChatPanel.tsx:252`; `StatusBar.tsx:4` | Duplicate global status bar; separate session footer from app status. |
| Medium | `TitleBar.tsx:11`; `TerminalView.tsx:168,217` | Workspace root and bash/zsh identity disagree. |
| Medium | `EditorArea.tsx:34-60`; `App.tsx:28-35` | Incomplete tab semantics, nested close key bubbling, missing focus restoration. |
| Medium | `Sidebar.tsx:29-37,108-119` | Folder expanded state and current file are not announced. |
| High | `ChatPanel.tsx:167,197`; `index.css:13` | Declared dim/80 on black ≈3.91:1; dim/70 ≈3.19:1. Edge on panel ≈2.87:1 where meaningful boundary needs 3:1. Verify computed colors in browser. |
| High | `ChatPanel.tsx:37,141,154`; `TerminalView.tsx:38` | Smooth auto-scroll/pulse/blink not consistently reduced-motion aware. |
| Medium | `TerminalView.tsx:37-49,274` | No configured screen-reader mode or named terminal region; actual AT behavior unverified. |
| Medium | `ChatPanel.tsx:152-156,188-197` | Pending state is a dot; no real Send button; Enter lacks composition check. |
| Medium | `ChatPanel.tsx:133,149,167` | Long messages/metadata may overflow; transcript unbounded and rerenders with input. |
| Medium | `TerminalView.tsx:80,97,226` | LF-only reduced-motion output and input/boot race can corrupt portrait and prompt. |
| Medium | `TerminalView.tsx:222-263` | Wrapped-line redraw, Ctrl+C/L, Unicode deletion and multiline paste/control handling incomplete. |
| Medium | `TerminalView.tsx:73-80`; `imageToAscii.ts:30-31` | Async load can finish after disposal; canvas failures lack robust completion/timeout. |
| Medium | `ChatPanel.tsx:30` | `chat` cannot reopen collapsed composer before focus. |
| High before launch | `lib/api.ts:11-20`; `ChatPanel.tsx:59-83` | No timeout/cancel/runtime response schema; busy may hang; failure loses draft; no retry. |
| Medium | `ChatPanel.tsx:63-66,78` | Message-count truncation splits turns; error copy addresses developers, not visitors. |
| Expected gap | `backend/main.py:45-56` | Echo stub ignores history; provider, grounding, usage and stream lifecycle absent. Stub itself is intentional, not a regression. |
| High before paid traffic | `backend/main.py:30-37` | Unbounded body/history/content; no public endpoint quota, concurrency or spending safeguards. |
| High before deployment | `backend/main.py:24-26`; `vite.config.ts:8-12` | Wildcard CORS and dev-only proxy; production routing undecided. |
| Medium | `frontend/package.json:6-10`; TS configs | No test commands, strict TS not enabled, build excludes lint. No tracked CI/tests found. |
| Medium | `TerminalView.tsx:31`; production build | Baseline lint warns about render-time ref assignment; build warns main JS exceeds 500 kB. Both commands succeed; address lifecycle and measured bundle/loading cost during implementation. |
| Low | `TitleBar.tsx:6-8`; `index.css:54` | Default palette traffic lights and scrollbar color bypass project token discipline. |
| Low | `frontend/index.html:5`; frontend README/assets | Starter favicon, unused Vite asset, template README remain. Deletion requires approval. |
| Medium | `.gitignore:6`; backend requirements | Exact `.env` ignore does not cover variants; backend minimum-only versions lack reproducible lock policy. |

## Guideline review outcome

Applied vendored frontend-design, better-layout, better-accessibility and web-design-guidelines to baseline source and the planned acceptance gates. All findings above remain open because runtime implementation was explicitly excluded. New Markdown scaffold files do not change the UI. **Block UI sign-off** until high findings and browser/AT checks pass. Documentation corrections in this session remove obsolete welcome/chat design claims; they do not fix the rendered application.
