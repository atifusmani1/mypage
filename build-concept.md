# Product concept — Atif Usmani's personal page

This file is the current product source of truth. The terminal/IDE concept has
been replaced; obsolete code and plans were removed with the user's approval.

## Experience

One simple, continuous personal page. Clean dark surfaces, bold white lettering,
soft gray copy, generous space, and thin dividers separate the sections. The
visual reference is `docs/design/hero-reference.png`.

- **Header:** “Atif Usmani” at the top left. Four compact, equally spaced,
  individual glass navigation links occupy the remaining bar. Glass should be
  faint and transparent without dimming the text. On narrow screens, the name
  sits above the four links.
- **Hero:** two bold lines, exactly “Always building.” and “Always Learning.”
  A short placeholder welcome sits below. The supplied ASCII portrait is offset
  right on desktop and below the copy on mobile. No icons or additional graphics.
- **About:** personal and professional introduction.
- **Projects:** space for supplied projects and experiments; no fabricated claims.
- **Beyond the screen:** working title for interests outside coding and AI/ML.
- **Contact:** space for real contact details when supplied.

All navigation uses anchors on this page, not separate routes. The header stays
visible while scrolling. Avoid decorative cards, extra labels, and animation.

## Design system

- Dark-only theme; native Helvetica/Arial sans-serif stack, no remote fonts.
- Colors and font tokens are defined only in `src/styles/theme.css` with `@theme`.
  App styles consume those tokens rather than raw colors.
- `liquid-glass-react` supplies the navigation effect. Elastic movement and
  chromatic aberration are disabled. Layout and readability do not depend on
  browser-specific displacement support.
- The portrait is a static export from the supplied UX Pilot effect. The page
  does not execute its compiled canvas runtime. Original sources and provenance
  remain in `docs/design/`.

## Implementation

A single Next.js App Router + React 19 + TypeScript application at the repository
root, with Tailwind CSS v4 and Liquid Glass React. Node 22 via Homebrew.

- `src/app/`: route, root layout, metadata, and global/responsive styles.
- `src/components/`: one React component per file.
- `src/data/site.ts`: section navigation and welcome text.
- `src/styles/theme.css`: active theme only.
- `content/about.md`: editable draft, not automatically rendered.
- `public/images/`: assets actually served by the page.
- `docs/design/`: supplied references and original portrait sources.

There is no backend, auth, tracking, terminal, arbitrary execution, or chat API.
`npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`, and `npm start`
run from the repository root. `tsconfig.json` covers the whole active application.

## Content status

The About draft was written from a publicly indexed LinkedIn profile and saved
for Atif to edit. Roles and details need confirmation before publication; the
website still shows its explicit About placeholder. Other page copy, projects,
interests, and contact details remain visibly marked placeholders.

Search indexing is disabled in metadata until publication content is approved.
Never invent personal details, achievements, project links, or email addresses.

## Quality gates

- Production build, TypeScript, and lint must pass.
- Review the rendered page on desktop and mobile after UI changes.
- Native keyboard navigation, visible focus, a skip link, and reduced motion.
- High-contrast text; no horizontal clipping at 320px or 200% text resize.
- Section targets must clear the sticky header.
- Run the vendored web-design-guidelines review before UI sign-off.

Next: finalize the About draft and other personal content, confirm the working
section title, decide hosting, and enable indexing when ready to publish.
