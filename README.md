# Atif Usmani

Hey, I'm Atif. Here's a bit about the work I've done, the projects and research I've been part of, and what life looks like beyond the resume.

You can browse the resume, open a project demo, or wander through the photo gallery. Take a look around.

## Run it locally

With Node.js 22 installed, run:

```bash
npm ci
npm run dev
```

Then open [localhost:3000](http://localhost:3000). No backend or environment variables needed.

Other useful commands:

```bash
npm run lint
npm run build
npm run typecheck    # after dev or build generates Next.js types
npm start            # serves the production build on port 3000
```

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

The files at the root are mostly config that the build tools expect there. Generated files like `.next/` are ignored by Git.

Built with Next.js, React, TypeScript, and Tailwind CSS. There's no analytics or tracking on the site; project demos use YouTube's privacy-enhanced player, which may contact Google when opened. Search indexing is disabled until publication is approved.
