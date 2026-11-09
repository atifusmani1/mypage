# AGENTS.md — repository rules

Read `build-concept.md` before making product decisions.

## Project and stack

Atif Usmani's continuous dark personal page, with bold white type, an ASCII
portrait, and compact liquid-glass section navigation.

- One Next.js App Router + React 19 + TypeScript app at the repository root.
- Tailwind CSS v4, with `liquid-glass-react` for navigation.
- Node 22, installed via Homebrew. No separate frontend/backend projects.
- Stack changes and new dependencies require explicit user approval.

## Structure

- `src/app/`: page, root layout, metadata, and global/responsive styles.
- `src/components/`: one React component per file, PascalCase names.
- `src/data/site.ts`: navigation and draft welcome copy.
- `src/styles/theme.css`: `@theme` color/font tokens; the only place app colors
  are defined. Components reference tokens, not raw hex. Third-party library
  internals are not app source and must not be edited in `node_modules/`.
- `content/about.md`: editable, unpublished About draft. Don't display it until
  the user approves publication.
- `public/images/`: only assets used by the public page.
- `docs/design/`: original references/effect assets; preserve provenance/notices.
- `.opencode/skills/`: vendored design skills; provenance in `SOURCES.md`.
- `README.md`: commands and the “Where things live” table.
- `build-concept.md`: current product spec; keep it accurate.

## Commands (repository root)

```bash
npm run dev          # http://localhost:3000
npm run build        # Next.js production build and framework/type checks
npm run lint         # Oxlint
npm run typecheck    # after Next has generated framework types
npm start            # serve the production build
```

## Engineering rules

1. Keep changes small, scoped, and consistent with existing patterns. Don't add
   abstractions or dependencies for hypothetical future features.
2. Never reset, discard, or overwrite user changes. Ask before destructive work
   or deleting files you didn't create in the current session.
3. Local commits only, when requested, using Conventional Commits. Never push,
   open PRs, rewrite history, tag releases, or publish.
4. Never commit secrets, `.env` files, `node_modules/`, or generated build output.
5. Accessibility is a gate: semantic HTML, native links/buttons, keyboard support,
   visible focus, reduced motion, high contrast, and responsive reflow.
6. UI work: consult relevant vendored design skills first. Run a
   web-design-guidelines review before sign-off.
7. Verify before “done”: build and lint must pass; visually inspect UI changes
   in a browser. State checks you could not perform.
8. Keep unapproved personal content visibly marked as draft/placeholder. Never
   fabricate personal claims, real-looking links, project details, or contacts.
9. Keep the README and product spec current when structure or behavior changes.
10. Don't leave a verification server occupying the user's development port.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
