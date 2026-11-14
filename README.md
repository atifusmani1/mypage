# Welcome to Atif Usmani's portfolio

Hi, I'm Atif. This is my personal space for sharing my work, projects, research, and a little life beyond the résumé.

The site opens with a short welcome, then lets you explore my experience, project demos, research, photo gallery, and résumé. It works on desktop and phones, with reduced-motion and keyboard-friendly alternatives.

## Run it locally

You'll need Node.js 22 and npm. From this folder:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). There is no backend or environment setup.

To check or serve a production build:

```bash
npm run lint
npm run build
npm run typecheck    # after dev or build generates Next.js types
npm start            # serves the production build on port 3000
```

## Make it yours

- **About text:** Edit [`content/about.md`](content/about.md). Keep it as plain text; the page reads it directly.
- **Experience and projects:** Edit [`src/data/site.ts`](src/data/site.ts) for résumé entries and detail text. The original résumé is in `content/Atif_Usmani_UCI_DS_AI_ML.pdf`.
- **Résumé download:** Replace that PDF and rebuild. The Resume link previews it and `/resume.pdf` serves it directly.
- **Links:** Contact links are in [`src/app/page.tsx`](src/app/page.tsx); entry links are in `src/data/site.ts`.
- **Photos:** Add originals to `content/image-panes/photos/`, run `npm run photos` on macOS to prepare web-ready copies, then add their paths and titles to [`src/data/photos.ts`](src/data/photos.ts).

Search indexing is disabled until publication is approved.

## Where things live

| Area | Location |
| --- | --- |
| Pages and routes | `src/app/` |
| Interactive pieces (intro, galleries, dialogs, cursor) | `src/components/` |
| Résumé, gallery, and photo data | `src/data/` |
| Theme tokens and page styles | `src/styles/theme.css`, `src/app/globals.css` |
| Original résumé, portrait, logos, and photos | `content/` |
| Web-ready gallery photos | `public/images/photos/` |
| Photo preparation script | `scripts/prepare-photos.mjs` |
| Design references and past verification notes | `docs/` |

The small set of files at the repository root is there for npm, Next.js, TypeScript, linting, and contributor guidance. Generated files such as `.next/`, `next-env.d.ts`, and `tsconfig.tsbuildinfo` are ignored by Git.

Built with Next.js, React, TypeScript, and Tailwind CSS. No separate backend, analytics, or tracking. Project videos use YouTube's privacy-enhanced player, which may contact Google when opened.
