# Repository cleanup verification

## Scope

The active Next.js application was consolidated at the repository root. The user
explicitly approved deleting unused legacy work, including uncommitted changes,
without a recovery archive. No Git history was reset or rewritten.

Removed: the Vite/xterm IDE, chat UI, FastAPI service, Python environments, stale
plans/screenshots, obsolete scaffold files, old build output, unused dependencies,
and the redundant nested UX Pilot export. Original reference and portrait sources
remain in `docs/design/`, with their third-party notices. Vendored design skills
remain in `.opencode/skills/`.

The About draft is in `content/about.md` and is not rendered on the page.

## Commands

Run from the repository root:

| Check | Result |
|---|---|
| `npm ci` | Pass; lockfile installs the cleaned application |
| `npm run build` | Pass; Next.js production build and framework types |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass, no warnings; supplied compiled effect excluded |
| `git diff --check` | Pass |

The source and manifest no longer reference the removed stack or old paths.

## Browser checks

Chromium, using a temporary verification dev server on port 3100:

- Visual review of full-page screenshots at 1440px and 390px.
- Responsive layout at 1440, 768, 390, and 320px: no horizontal overflow,
  four equal-width navigation links, portrait successfully loaded.
- Axe WCAG A/AA checks at all four widths: zero violations.
- Keyboard: first Tab reaches the visible skip link; Enter focuses main.
- All four section links update the URL hash/current-section annotation; targets
  are visible below the sticky header.
- Reduced-motion emulation: anchor scrolling is instant; portrait is static.
- 200% text resize at a 720px viewport: no horizontal overflow.
- JavaScript disabled: all four section links remain available.
- Draft content, original source photo, and removed `/api/health` endpoint return
  404 when requested as public URLs.
- No browser runtime errors in the exercised flows.
- Verification server stopped after testing; no development port left occupied.

## Web interface guidelines review

- `src/app/page.tsx` — pass: semantic sections, native anchors, decorative image
  with dimensions and preload, explicit placeholders.
- `src/app/layout.tsx` — pass: language, dark color scheme, draft metadata.
- `src/app/globals.css` — pass: focus, skip link, anchor clearance, reduced motion,
  responsive reflow, and forced-color navigation edges.
- `src/styles/theme.css` — pass: active app tokens only, no IDE theme dependency.
- `src/components/SiteHeader.tsx` — pass: semantic header and no-JS navigation.
- `src/components/GlassNavigation.tsx` — pass: native links, current section,
  no elastic movement or gesture-only controls.

No actionable findings in the inspected scope. Not verified: actual screen-reader
output, native browser-toolbar zoom, RTL, Safari/Firefox rendering, or physical
touch devices. Automated accessibility checks do not replace those reviews.

Content approval and publication remain separate from technical verification.
