# Reference index

These are design evidence, not public-site assets. Do not copy screenshot personal paths, model labels, token counts or version notices into the product as facts.

| File | Role |
|---|---|
| `page-opening-animation.png` | Primary workbench layout and initial chat composition. Static PNG: no animation timing evidence. |
| `chat-TUI-example.png` | Primary populated-chat transcript, cyan rail, highlighted composer and context column. |
| `opencode-embedded-panel.png` | Earlier embedded TUI screenshot, renamed from `Screenshot 2026-10-24 at 2.56.06 PM.png` (original filename contained a narrow space before PM). |
| `reference-dark-high-contrast-terminal.png` | Older contrast reference, subordinate to the current layout references. |

All four images were moved from docs/ with user approval. Original image bytes are preserved. The new opening/chat screenshots were user-supplied untracked files before this scaffold session.

## External resources reviewed 2026-10-31

- https://code.visualstudio.com/docs/getstarted/userinterface — resolves to current editor UI documentation. Used for workbench areas, tabs, Explorer and command palette responsibilities, not to override user's bottom-panel layout.
- https://opencode.ai/v2/docs/cli — TUI versus background service distinction. This project imitates the supplied view; it does not install/embed OpenCode or promise its tool execution capabilities.
- https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/ — separator semantics, arrow keys, collapse/restore and values. APG notes the pattern's example/review is incomplete; validate actual assistive-technology behavior, not just attributes.
- https://xtermjs.org/docs/guides/security/ — terminal trust boundaries, safe DOM handling, restrictive execution privileges; supports the approved simulated-shell boundary.

Vendored skills remain the project's design review standards. No external dependency or third-party code was added through this research.
