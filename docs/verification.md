# Verification record

This is a chronological record of earlier checks, not a current test report.
For current behavior and file locations, see `build-concept.md` and `README.md`.

## Current update: thermal alignment and portrait size

- The gradient copy and white copy now share a grid cell, fixing the offset
  visible on résumé row hover, including the rightmost column's padded labels.
- Portrait and summary use a narrower right-aligned desktop column, with the
  portrait roughly 16vw wide as in the supplied sizing reference. The first
  résumé track was adjusted so the middle column stays near its previous edge.
- Headless Chromium hover inspection at 1440×900 confirmed white/gradient text
  layers have identical bounds in all three columns and no doubled characters.
  Reduced-motion screenshots at 1440×900, 1024×768, and 320×568 show the smaller
  portrait and intact mobile stack. Build, lint, and diff whitespace checks pass.
  Not verified: Safari/Firefox, 200% zoom, or real screen readers.

## Current update: résumé right-column spacing

- Inset only the rightmost desktop résumé text by 0.75rem, widening its gap to
  the portrait/summary without moving the left and middle columns. The inset
  resets when résumé rows stack. The corner Gallery link stays put.
- Inspected reduced-motion Chromium screenshots at 1440×900 and 1024×768:
  columns remain aligned and the corner link remains visible. Build, lint,
  and diff whitespace checks pass. Phone reflow uses the existing stacked rule;
  200% zoom and RTL were not visually retested for this small inset.

## Current update: gallery timing

- Gallery now changes one tile every 3 seconds (500ms opacity fade). Hover
  freezes only the hovered tile while the other two
  continue on the same beat; leaving resumes its rotation. Reduced-motion and
  hidden-tab pauses remain intact.
- The portrait and assembly canvas now use the same crop of the supplied PNG's
  transparent side padding, putting the visible artwork against the right page
  margin without changing the source file. Summary remains directly below it.
- Inspected reduced-motion Chromium screenshots at 1440×900 and 390×844 on the
  homepage, and at 1440×900 on the gallery. Build, lint, and `git diff --check`
  pass. Hover hold timing, 200% zoom, RTL, and real screen readers were not
  exercised in this screenshot pass.

## Current update: Gallery label and homepage layout

- “Gallery” replaces “Photo Gallery” in the homepage link, gallery heading,
  and page title. The `/more-life` URL remains unchanged.
- Restored the Gallery link to the bottom-left corner. The portrait reaches the
  right page margin, and its summary starts directly beneath it at the same
  width. Résumé rows use 1rem text, more vertical padding, and a right-aligned
  third column separated from the summary by a narrow gutter.
- At 1024px and below, section spacing tightens enough to keep the corner link
  visible on a 1024×768 desktop; phones retain larger group gaps and stacked rows.
- Inspected reduced-motion Chromium screenshots at 1440×900, 1024×768,
  390×844, and 320×568. Build, lint, and `git diff --check` pass. Not verified:
  200% zoom, RTL, Safari/Firefox, physical devices, or screen-reader output.

## Current update: homepage spacing

- Reduced the desktop gutter between the résumé and portrait/summary, widened
  the summary column, and aligned the portrait with the summary's left edge.
  The Photo Gallery link now follows Research instead of being pushed to the
  bottom of the viewport. The dark theme remains unchanged.
- Inspected headless Chromium screenshots at 1440×900, 1024×768, 390×844,
  and 320×568 with reduced motion enabled. Desktop columns read closer together;
  phones retain the stacked reading order without visible horizontal clipping.
  The final 12px link-spacing adjustment followed those screenshots.
- Build, lint, and diff whitespace checks pass. Not verified: 200% zoom, RTL,
  Safari/Firefox, physical devices, or screen-reader output.

## Current review: responsive layout and gallery documentation

- Research figure columns now shrink within the dialog's content width instead
  of overflowing a narrow phone-sized popup. The dialog and detail page still
  use the same figure grid.
- More Life deals a shuffled photo list on each visit and changes one pane every
  1.2 seconds. Rotation now stops under reduced motion; the 500ms opacity fade
  and hover pause remain unchanged. README and product spec reflect this behavior.
- The older update records below document the state at the time of each change;
  they are not current behavior specifications. The README and `build-concept.md`
  describe the current site.
- Renamed the misspelled `cell-universse/` research folder to `cell-universe/`
  and updated its imports. Original photo and design provenance assets remain
  untouched; no source files were deleted.
- Production build, lint, typecheck, and `git diff --check` pass. The production
  `/research` route returned HTTP 200 on an isolated port; the test server was
  stopped afterward. Browser screenshot capture was unavailable, so current
  spacing at 320px, 200% zoom, and in Safari remains visually unverified.
- Web-design-guidelines review: figure grid now avoids narrow-dialog overflow;
  close-button hover is restricted to hover-capable pointers. The gallery still
  has no keyboard-accessible pause control (WCAG 2.2.2), as recorded below; that
  existing design tradeoff was not changed in this layout/organization pass.

## Current update: research gallery

- Both Research rows open `/research`: two black tiles matching Projects, showing
  the supplied lab logos at a 10rem cap (the source PNGs are 100–106px) with a
  small BIAS Lab / Cell Universe Lab label beneath. Labels keep the tiles
  self-describing on touch, where there is no hover cursor.
- Selecting a tile opens the shared native dialog with the résumé role, location,
  and bullets, followed by the supplied figures: one sensorimotor diagram for BIAS
  Lab; PCA round, PCA elongated, and 3D cell view for Cell Universe Lab. Figures
  are two columns on desktop and one on phones, with static dimensions so space is
  reserved.
- Outside click, Close, and Escape dismiss the dialog and return focus to the tile.
  `/research/[slug]` remains a direct-link/no-JavaScript fallback and now shows the
  same figures; its category label reads “Research”. No new dependencies.
- Checked 1440×900 desktop and 390×844 mobile Chromium: tile labels, cursor titles,
  dialog contents, figure sizes and alt text, mobile stacking, no horizontal
  overflow, no console or hydration errors.
- Build, lint, and typecheck pass. Dev-server note: running `next build` while the
  dev server is up left a stale server-rendered copy of the gallery until the
  component was re-saved; a normal save after editing clears it.
- Not verified: Safari/Firefox or actual screen-reader output.

## Current update: More Life gallery and page spacing

- `/more-life` shows three black photo tiles (4:5, rounded, shadowed) that
  cross-fade through the 24 supplied photos. One tile changes every 2.2 seconds
  (6.6s per tile): the outgoing photo fades out over 500ms, revealing the next
  one, so there is no movement and no two tiles change together. Hovering a tile
  pauses the strip and expands the hollow-circle cursor with that photo's title.
- There are no captions and no Previous/Pause/Next controls; the cursor is the
  only visible title. Each image keeps its title as alt text for assistive
  technology. Hover pause is the only pause mechanism, which does not meet WCAG
  2.2.2 for keyboard users; the user chose this hands-off photobook behavior.
- The fade is opacity only, so it is used unchanged for `prefers-reduced-motion`.
  Advancing stops while the tab is hidden.
- Photos: 24 unique originals from `content/image-panes/photos/` (two duplicate
  files removed: `Angels-Landing copy.JPG` and `IMG_3189.HEIC`). `sips` drops the
  HEIF rotation, so `npm run photos` renders each through Quick Look first and
  writes upright 1600px JPEGs to `public/images/photos/`.
- Homepage adds a plain "More Life" link at the bottom left, hidden during the
  typing intro and pinned above the bottom safe area.
- Spacing pass: résumé rows sit 18–22px apart inside a group while sections are
  29–44px apart, so groups read as groups. Resume columns are now fractional
  rather than fixed `8rem/19rem`, so the summary no longer squeezes near 1024px.
  The page gutter and a 1600px maximum width are shared by the header and the
  Work/Projects/More Life tile rows; at 1440px both the "← Home" link and the
  tiles start at x=26.
- Chromium checks on the user's port-3000 server: homepage fits without scrolling
  at 1920×1080, 1440×900, 1280×720, and 1024×768; 390×844 and 320×568 scroll
  vertically as approved. Gallery fits at 1920×1080, 1440×900, 1280×720,
  1024×768, 900×900, and 800×1024, and stacks below 760px. Pane ratio stays 4:5
  on every desktop width checked.
- 200% root text size at 320, 390, 1024, and 1440 on `/`, `/more-life`, and
  `/work`: no horizontal overflow and no element clipped at the viewport edge.
  The résumé stacks to one column; gallery tiles keep their 4:5 frames.
- Rotation, hover pause, hover cursor label, fade timing, staggered timing (one
  tile every 2.2s, measured from computed state), the same fade under reduced
  motion, and mobile stacking exercised. No console or hydration errors.
- Build, lint, and typecheck pass. Web-design-guidelines review: native links,
  visible focus, alt text on every photo, hover gated to hover-capable pointers,
  reduced-motion CSS, decorative cursor `aria-hidden`, no dead controls, no new
  dependencies. No actionable findings in the changed scope apart from the
  noted missing pause control.
- Not verified: Safari/Firefox, real screen readers, physical touch devices,
  RTL, or long-session rotation drift. The verification browser reused the
  existing development server on port 3000.

## Current update: project demo videos

- Solar Shield and Parallax AI detail pages embed their demos from
  `youtube-nocookie.com` in a 16:9 box (768×432 desktop, 366×206 at 390px).
  Opening the page starts muted playback (`autoplay=1&mute=1`) with native controls.
- Reduced motion loads the same player with `autoplay=0`. Server HTML contains only
  a plain YouTube fallback link; the iframe mounts after hydration, and stays a link
  without JavaScript. No hydration or console errors.
- Checked both video IDs, iframe titles, `allow` policy, autoplay/mute parameters,
  reduced-motion behavior, mobile reflow, and no horizontal overflow in Chromium.
  YouTube player assets loaded and playback advanced in the headless browser.
- Build, lint, and typecheck pass. Third-party YouTube requests are documented in
  README/build-concept; no new dependencies.
- Not verified: audible autoplay (deliberately muted), Safari/Firefox, signed-out or
  regional YouTube restrictions, or actual screen-reader output.

## Compact index, detail pages, and MTC link

- Home résumé is a three-column index (organization, role, few-word summary) in
  Education, Work, Leadership, Projects, Research order, with wider group spacing.
  At 1440×900, 1280×720, and 1024×768 every row stays on one line and the page
  fits without scrolling.
- Work and Projects rows are whole-row Next.js links to their shared galleries;
  Research rows link to the shared `/research` gallery; MTC UCI links to its
  Instagram profile; Education stays static. Unknown slugs return 404. Detail
  pages skip the intro and show “← Home”.
- Hover and keyboard focus fade the entire row's text to thermal with no underline
  or background; focus outlines the whole row. Screen-reader link names separate
  the three cells with visually hidden commas; decorative thermal copies are
  aria-hidden. Added theme-color and group semantics for the contact links.
- Checked desktop and 390px mobile Chromium screenshots, hover, focus, accessible
  link names, the Instagram href, 404 output, no horizontal overflow from 320px to
  1440px, and no console or hydration errors.
- Build, lint, and typecheck pass. Web-design-guidelines review: semantic links,
  focus-visible, reduced motion, explicit transitions, image dimensions/preload,
  no new dependencies; no actionable findings in changed scope.
- Not verified: Safari/Firefox, actual screen readers, or signed-in Instagram
  navigation. Between 761px and 950px, desktop summaries wrap and the page may
  scroll; the phone layout stacks each row.

## Falling portrait entrance

- Portrait hidden (space reserved) during the typing intro. At the résumé reveal,
  its existing 16px character-sized PNG fragments fall vertically into position
  on a small canvas for about 1.45 seconds, then the original still is restored.
- Chromium desktop and mobile screenshots inspected during assembly and after
  settling. At 1440×900, the completed screen still fits without scrolling.
- Verified: portrait hidden/content hidden during intro; canvas visible/image
  hidden alongside résumé content during assembly; canvas hidden/image visible
  after settling; repeat visit skips assembly; reduced motion shows the still.
  Mobile 390px has no horizontal overflow. No console or hydration errors.
- Build, lint, and typecheck pass. Web-design-guidelines review: decorative
  canvas is inside aria-hidden artwork, no focus or pointer interception, image
  dimensions and preload retained, motion gated in JavaScript/CSS, no loops,
  no new dependencies, normal static-image fallback preserved.
- Not verified: Safari/Firefox, physical-device animation performance,
  screen readers, or simulated image/canvas failure.

## Thermal link text

- Contact links are white and un-underlined at rest. Hover/focus fades a
  decorative, accessibility-hidden thermal text overlay in over 150ms; there
  is no colored background. Keyboard focus outline remains.
- Lightened violet/magenta for text contrast. Computed stop/page ratios:
  violet 6.34:1, magenta 6.21:1, orange 5.71:1, yellow 14.04:1.
- Chromium desktop screenshot inspected; default white state, no underline,
  transparent background, clipped gradient text, circle cursor, and keyboard
  focus verified. Build, lint, and typecheck pass.
- Web-design-guidelines review: native links remain in a distinct contact row;
  decorative overlays are aria-hidden and pointer-transparent; hover is gated
  to hover-capable devices; reduced motion removes transitions; forced colors
  hides decorative gradient text. No new actionable findings in changed scope.
- Not verified: Safari/Firefox, physical touch, or actual screen-reader output.

## Recruiter résumé layout, summary, and cursor

Supersedes the older four-section layout records below. About copy now appears
as one paragraph beneath the portrait, followed by the three approved contact
links. Five compact résumé sections come from the supplied PDF. All rendered
text is white. The cursor is an independently implemented white hollow circle;
there are no new dependencies or copied unlicensed cursor sources.

- Build, lint, typecheck, and diff whitespace checks pass.
- Chromium screenshots inspected at 1440×900, 1024×768, and 390×844, including
  link hover and the three-line intro. Desktop fits without scrolling at
  1440×900, 1280×720, and 1024×768.
- At 390×844 and 320×568, content scrolls vertically as explicitly approved;
  no horizontal overflow. At 200% root text size, all five tested widths have
  no horizontal overflow (1440, 1280, 1024, 390, 320).
- Contact destinations match the user-supplied Gmail, GitHub, and LinkedIn.
- Mouse move shows the white hollow circle and hides the native pointer. Tab
  hides the circle and restores native behavior; Email receives visible focus.
  Reduced-motion change disables the circle. Link hover and keyboard focus use
  the same thermal treatment; underline remains as a non-color link cue.
- Intro types all three lines, hides résumé content during typing, completes,
  reveals the five sections, and does not replay on refresh. No runtime errors.
- White/page contrast calculated at 19.83:1. White on the four approved thermal
  stops with the 60% page-color overlay: 17.04:1, 14.02:1, 11.28:1, 6.68:1.
- Web-design-guidelines review: semantic main, aside, hierarchical headings,
  list entries, native links, decorative image dimensions/preload, token colors,
  safe-area insets, hover-capability gates, reduced motion, and visible focus.
  No navigation precedes main, so no main-content bypass link is needed.
- Approved thermal values are retained in theme tokens and the product spec;
  the temporary reference screenshot was deleted with the user's permission.

Not verified in this revision: Safari/Firefox, real screen readers, physical
touch devices, forced-colors rendering, RTL, native browser-toolbar zoom, or
automated axe. Older checks below are historical, not current coverage.

## Single-screen opening page

The page is now one non-scrolling opening screen. The header, name bar, section
navigation, footer, and separate section anchors were removed. The name remains
as plain text at the top left, not as a bar. The About, Projects, Beyond the
screen, and Contact copy share one compact vertical stack beneath the hero.

Removed `src/components/SiteHeader.tsx`, `src/components/GlassNavigation.tsx`,
the `liquid-glass-react` dependency, the section list in `src/data/site.ts`, and
all related CSS. The page no longer needs client-side JavaScript.

## Scope

The active Next.js application was consolidated at the repository root. The user
explicitly approved deleting unused legacy work, including uncommitted changes,
without a recovery archive. No Git history was reset or rewritten.

Removed earlier: the Vite/xterm IDE, chat UI, FastAPI service, Python environments,
stale plans/screenshots, obsolete scaffold files, old build output, unused
dependencies, and the redundant nested UX Pilot export. Original reference and
portrait sources remain in `docs/design/`, with their third-party notices.
Vendored design skills remain in `.opencode/skills/`.

## Commands

Run from the repository root:

| Check | Result |
|---|---|
| `npm run build` | Pass; Next.js production build and framework types |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass, no warnings |
| `git diff --check` | Pass |

## Browser checks

Chromium, using the existing development server on port 3000:

- Visual review at 1440×900, 390×844, and 320×568. The page reads as one opening
  screen: name, headline, portrait, welcome line, then four short detail blocks.
- Normal viewports checked: 1920×1080, 1536×864, 1440×900, 1366×768, 1280×720,
  1024×768, 768×900, 390×844, 360×640, and 320×568. Every size matched
  `scrollWidth` to `innerWidth` and `scrollHeight` to `innerHeight`: no scrolling.
- The details stack stays vertical at every width. Labels use a fixed column on
  wider screens; on phones they sit in a narrow left column, and at 320px or
  large text sizes they move above their copy.
- Axe WCAG A/AA checks: zero violations at every normal viewport tested.
- 200% root text size at 1440, 768, 390, and 320px: no horizontal overflow. The
  page grows vertically, and the label/copy rows stack rather than squeezing the
  copy into a narrow column.
- JavaScript disabled: all content renders and the screen still fits at 900px.
- No browser runtime errors in the exercised flows because the page has no
  client-side runtime. The verification server was not started or stopped; the
  user's development server was reused.

## Web interface guidelines review

- `src/app/page.tsx` — pass: one `main`, one `h1`, labelled `h2` detail sections,
  decorative portrait with dimensions and preload, explicit placeholders.
- `src/app/layout.tsx` — pass: language, dark color scheme, draft metadata.
- `src/app/globals.css` — pass: visible focus, high contrast, reduced motion,
  reflow, container-query text sizing, forced-colors-safe plain markup.
- `src/styles/theme.css` — pass: active app tokens only.
- `src/data/site.ts` — pass: one short welcome string.

No actionable findings in the inspected scope. Not verified: actual screen-reader
output, native browser-toolbar zoom, RTL, Safari/Firefox rendering, or physical
touch devices. Automated accessibility checks do not replace those reviews.

## Typing intro and revised opening layout

The opening screen now uses a corner-tucked, slightly larger name; a larger
portrait at the top right with a placeholder summary beneath it; and the four
detail rows stacked down the left column. On the first visit in a tab, a
one-time client intro types “Welcome!” above “Always Building.” above
“Always Learning.” as a three-line block, then the rows drop in. The sequence is
remembered in `sessionStorage` after it runs and bypassed for reduced motion.
Without JavaScript the final content renders immediately.

Checks used a production build and headless Chromium on port 3100, separate from
the user's development server:

| Check | Result |
|---|---|
| `npm run build`, `typecheck`, `lint` | Pass; no warnings |
| 1440×900, 1920×1080, 1280×720, 1024×768, 900×700, 768×900, 390×844, 320×568 | No scrolling; `scrollWidth` equals `innerWidth` |
| Intro run | Each phrase types in one pass as three stacked lines; completes in about 4 seconds; details stay hidden until done |
| Reload in the same tab | Intro does not replay; final content renders |
| Reduced motion | Intro skipped; final content shown immediately |
| JavaScript disabled | Final content and portrait render |
| 200% root text size at 1440, 768, 390, and 320 | No horizontal overflow; page grows vertically |
| Browser console | No runtime errors |

Not verified: Safari/Firefox, physical iOS/Android devices, actual screen-reader
output, RTL, or native browser-toolbar zoom.

Content approval and publication remain separate from technical verification.
