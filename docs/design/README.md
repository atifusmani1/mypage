# Design references and portrait sources

- `hero-reference.png`: supplied full-page reference for composition and type.
- `original-headshot.png`: original headshot from the earlier build, retained as
  a source asset rather than served by the website.
- `uxpilot-effect/`: the supplied, self-contained effect export. Its own source
  image, settings, compiled runtime, preview, and third-party notices stay intact.

The redundant nested `uxpilot-effect (1)/` export was removed during cleanup.
Its settings and source image were identical; only playback position and asset
identifiers differed. This is one canonical export, not a new effect implementation.

## Historical ASCII portrait export

The former `public/images/atif-ascii.png` was generated with the supplied UX Pilot runtime:

1. Serve `docs/design/uxpilot-effect/` over local HTTP and open it in a browser.
2. Import `mount` from `effect.js` and load `settings.json`.
3. Set `previewId` to `result` and `playback.playing` to `false`, preserving the
   other supplied settings and resolving asset URLs relative to the effect folder.
4. Mount into a 1400 × 1400 element and call `exportPNG({ pixelRatio: 1 })`.
5. Save the resulting PNG as an export.

That export was removed when the favicon in `src/app/icon.png` was replaced with
a crop of `content/huey-computer.jpg`. The on-page portrait remains the supplied
`content/aitf-usmani-portrait.png`, displayed by `src/components/portrait.tsx`.
The original UX Pilot canvas runtime is not served.

The effect colors
and character treatment were not changed. Original headshots and compiled source
are intentionally outside `public/`; their files are not public app routes.

Retain `uxpilot-effect/THIRD-PARTY-NOTICES.txt` with the supplied effect source.
