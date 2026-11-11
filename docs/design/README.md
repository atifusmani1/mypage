# Design references and portrait sources

- `hero-reference.png`: supplied full-page reference for composition and type.
- `original-headshot.png`: original headshot from the earlier build, retained as
  a source asset rather than served by the website.
- `uxpilot-effect/`: the supplied, self-contained effect export. Its own source
  image, settings, compiled runtime, preview, and third-party notices stay intact.

The redundant nested `uxpilot-effect (1)/` export was removed during cleanup.
Its settings and source image were identical; only playback position and asset
identifiers differed. This is one canonical export, not a new effect implementation.

## Public portrait

`public/images/atif-ascii.png` was generated with the supplied UX Pilot runtime:

1. Serve `docs/design/uxpilot-effect/` over local HTTP and open it in a browser.
2. Import `mount` from `effect.js` and load `settings.json`.
3. Set `previewId` to `result` and `playback.playing` to `false`, preserving the
   other supplied settings and resolving asset URLs relative to the effect folder.
4. Mount into a 1400 × 1400 element and call `exportPNG({ pixelRatio: 1 })`.
5. Save the resulting PNG to `public/images/atif-ascii.png`.

The website serves an optimized still, not the original UX Pilot canvas runtime.
`src/components/falling-portrait.tsx` uses a small independent canvas entrance:
16px character-sized fragments of this existing PNG fall into their final positions
as the résumé appears. After about 1.45 seconds, the still replaces the canvas.
This preserves the original finished artwork rather than reinterpreting it as a
new character set. Reduced motion and repeat visits keep the optimized still.

The effect colors
and character treatment were not changed. Original headshots and compiled source
are intentionally outside `public/`; their files are not public app routes.

Retain `uxpilot-effect/THIRD-PARTY-NOTICES.txt` with the supplied effect source.
