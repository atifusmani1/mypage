# Atif Usmani's personal website

A continuous dark portfolio built with Next.js App Router, React 19, TypeScript,
Tailwind CSS v4, and [Liquid Glass React](https://github.com/rdev/liquid-glass-react).

## Development

Run all commands from the **repository root** (`mypage/`). Node 22 is recommended.

```bash
npm ci
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck    # after next dev or next build generates framework types
npm run build
npm start            # serve the production build at :3000
```

There is no separate backend and no required environment configuration. The old
`frontend/` and `backend/` projects have been removed. Stop an existing dev server
before starting another server on port 3000.

## Where things live

| What | Where |
|---|---|
| Home page and section markup | `src/app/page.tsx` |
| Root layout and metadata | `src/app/layout.tsx` |
| Global and responsive styles | `src/app/globals.css` |
| Color and font tokens | `src/styles/theme.css` |
| Header and glass navigation | `src/components/` |
| Navigation labels and welcome copy | `src/data/site.ts` |
| Editable About draft | `content/about.md` |
| Public ASCII portrait | `public/images/atif-ascii.png` |
| Design reference, original photos, and effect source | `docs/design/` |
| Design provenance and portrait export notes | `docs/design/README.md` |
| Product direction | `build-concept.md` |
| Verification notes | `docs/verification.md` |
| Contributor/agent rules | `AGENTS.md` |

## Editing content

Start with **[`content/about.md`](content/about.md)** to edit the About draft.
It is intentionally **not rendered on the website** yet. Confirm the roles and
details before replacing the live placeholder in `src/app/page.tsx`.

Welcome copy and navigation labels live in `src/data/site.ts`. Other section copy
currently lives in `src/app/page.tsx`. Contact links and project details remain
clearly marked placeholders; no real contact destination has been supplied.
Search indexing is disabled in the root layout until the page is ready to publish.

## Design and behavior

- Bold white type on a near-black page, with the supplied ASCII portrait.
- Name at the top left; four compact, evenly spaced, transparent glass links.
- Native anchors for About, Projects, Beyond the screen, and Contact.
- Visible keyboard focus, a skip link, and reduced-motion support.
- Navigation remains available without JavaScript. Safari/Firefox support only
  part of the glass refraction effect; links do not depend on it.
- Original source photos and compiled effect code stay in `docs/design/`, not
  `public/`. Only the optimized portrait asset is served by the page.

No tracking, visitor data collection, terminal simulation, or chat service is
included. Dependencies and lockfile describe only the active Next.js application.
