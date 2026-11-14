# Product concept — Atif Usmani's personal page

## Experience

A minimal, dark résumé page optimized for recruiters. White text, no cards,
navigation bar, or footer. Fit on normal desktop screens; readable vertical
scrolling is approved on phones and at large text sizes.

- Name tucked into the top-left corner.
- On the first visit per tab, type “Welcome!”, “Always Building.”, and
  “Always Learning.” as three stacked lines. Hold briefly, clear the block,
  and drop in the résumé sections. No skip control. Reduced motion skips the intro.
- The portrait stays hidden during typing: the initial frame shows only the name.
  As the résumé appears, the supplied ASCII image appears all at once. Reduced
  motion, repeat visits, and no JavaScript use the same still portrait.
- Education, Work, Leadership, Projects, Research appear in that order on the left
  with breathing room below the name, as a compact three-column index:
  organization, role, and a few-word summary.
  Education is not a link. Every Work row links to the shared `/work` gallery.
  Projects rows link to the shared `/projects` gallery. Research rows link to the
  shared `/research` gallery, and the MTC UCI
  leadership row links to its Instagram profile. Content comes from
  `content/Atif_Usmani_DS_UCI_AI_ML.pdf`: all three jobs, both projects,
  leadership, education, and both labs. No invented dates or links.
- Detail pages reuse the dark page and cursor, show a plain “← Home” text link
  above the entry, and skip the typing/portrait intro. Research detail pages also
  show the supplied figures.
- Work gallery: three equal black desktop tiles with rounded corners, layered
  shadows, gaps, and small outer margins; vertically stacked on phones, with
  fully visible PNG logos from `content/image-panes/work/`. Tiles show only logos;
  each link retains an accessible experience label for assistive technology.
  Mouse hover expands the cursor with a slowly rotating circular title: Entegris
  Systems Engineer, Caliber Boards ML Engineer, or CUSM Data Analyst.
  Selecting a pane opens that experience's existing details in a centered black
  native dialog. Behind it the panes are blurred and dimmed. Outside click,
  Close, and Escape dismiss it, restoring focus to the pane. Background scrolling
  is locked while open; the dialog scrolls if needed. Native cursor is used in
  the dialog. Reduced motion disables the custom cursor and rotation.
  Existing `/experience/[slug]` routes remain direct-link/no-JavaScript fallbacks.
- The Solar Shield and Parallax AI detail pages embed their demo through YouTube's
  privacy-enhanced domain. Opening the page starts muted playback (browsers block
  audible autoplay); the native player unmutes. Reduced motion loads it paused, and
  before hydration or without JavaScript the embed is a plain YouTube link.
- Projects gallery: two tiles matching Work, using logos from
  `content/image-panes/projects/`, with Solar Shield and Parallax AI cursor titles.
  Each opens a centered black popup containing its existing demo embed and a
  brief factual description below. Muted autoplay and reduced-motion behavior
  match the detail pages. Closing removes the player and stops playback.
  Dismissal, blur, focus restoration, and mobile stacking match Work.
  Existing project detail pages remain direct-link/no-JavaScript fallbacks.
- Research gallery: two tiles matching Projects, using the supplied lab logos from
  `content/image-panes/research/`, with BIAS Lab and Cell Universe Lab labels and
  cursor titles. Each opens a centered black popup with the résumé role, location,
  bullets, and the supplied figures below: one sensorimotor diagram for BIAS Lab;
  three PCA and 3D cell views for Cell Universe Lab. Figures are statically
  imported, so dimensions reserve space. The logo files are only about 100px, so
  tiles cap them at 10rem instead of stretching them. Dismissal, blur, focus
  restoration, and mobile stacking match Work. Existing research detail pages
  remain direct-link/no-JavaScript fallbacks and show the same figures.
- “Gallery” sits in the homepage's bottom-left corner, below the résumé with
  breathing room, matches the résumé organization names in size and weight,
  and opens `/more-life`:
  three black photo tiles dealt from a newly shuffled photo order on each visit,
  with one tile cross-fading every 3 seconds so no two tiles change at once.
  The swap is a 500ms opacity fade with no movement. Titles appear only in the
  hover cursor (no dashes); no captions or buttons. Hover holds that tile while
  the other two keep changing.
  Reduced motion stops the rotation. Phones stack the tiles.
- ASCII portrait is a compact, roughly 17vw square on desktop, with its visible
  artwork slightly inset from the right page margin by cropping transparent
  padding in its frame. The user-written
  `content/about.md` appears directly beneath it at the same width, as one plain
  paragraph with relaxed line spacing rather than a résumé section.
- Résumé rows have readable text and room between entries; the rightmost column
  stays right-aligned but sits farther left, leaving more space before the
  portrait/summary.
  On narrow screens, the three columns stay side by side with smaller text
  wrapping within each cell; the Gallery link follows the final entry.
- Under the summary: plain Email, GitHub, LinkedIn, and Resume links. Resume
  opens a centered PDF preview in a native dialog, with Download and Close actions.
  Outside click and Escape also dismiss it, restoring focus to Resume. Without
  JavaScript, the link opens the PDF directly at `/resume.pdf`. The PDF comes
  from `content/Atif_Usmani_UCI_DS_AI_ML.pdf`.
  The approved email is atifaliusmani@gmail.com, overriding the email in the résumé.
- On phones, portrait and name lead, followed by summary, contacts, and résumé.
  Each index entry keeps its three columns rather than stacking its parts.
- A white hollow circle replaces the mouse cursor on fine, hover-capable pointers.
  No colored cursor, trailing dot, or dependency. Native cursor remains for reduced
  motion, forced colors, touch, and when the enhancement is unavailable.
- Contact and résumé links are white without underlines at rest. Hover and keyboard
  focus cross-fade the text itself to a thermal gradient over 150ms, with no
  background fill; both text layers share the same cell so they stay aligned.
  An entire index row responds as one link. Violet #9585E0,
  magenta #ED57AE, orange #F4511E, yellow #FFD600; violet and magenta are lightened
  for readable text on the dark page. Keyboard focus keeps a visible outline.
  Reduced motion removes the fade; forced colors keeps native text.
- On touch-only phones, two seconds after the intro clears (or the page opens
  on a repeat visit), the thermal link effect highlights only the three Work
  links, starting with Entegris and spending about one second on each. It does
  not auto-scroll or loop and pauses while the tab is hidden. Reduced motion
  and forced colors skip the sweep; there is no pause control.

## Implementation

Next.js App Router, React 19, TypeScript, Tailwind CSS v4, Node 22. No new dependencies.

- `src/app/`: server page, detail routes, metadata, intro bootstrap, responsive styles.
- `src/app/[category]/[slug]/page.tsx`: one static detail page per linked entry.
- `src/app/work/page.tsx`, `src/app/projects/page.tsx`, `src/app/research/page.tsx`, `src/components/pane-gallery.tsx`: Work, Projects, and Research galleries with shared native dialogs.
- `src/app/more-life/page.tsx`, `src/components/photo-gallery.tsx`: Gallery at `/more-life`; `src/data/photos.ts` holds its titles and photo list.
- `src/data/research.ts`: research tiles, cursor titles, and figure imports/alt text.
- `content/image-panes/work/`, `content/image-panes/projects/`, `content/image-panes/research/`: supplied logos and figures, imported statically and bundled by Next.js.
- `content/image-panes/photos/`: supplied photo originals. `scripts/prepare-photos.mjs` writes upright 1600px JPEGs to `public/images/photos/`.
- `src/components/opening.tsx`: typing sequence and content reveal.
- `src/components/circle-cursor.tsx`: optional mouse-only hollow circle.
- `src/components/portrait.tsx`: static ASCII portrait with responsive image sizing.
- `src/components/thermal-text.tsx`: white label plus thermal hover/focus duplicate.
- `src/components/mobile-thermal-sweep.tsx`: brief one-time mobile thermal preview.
- `src/components/project-video.tsx`: lazy YouTube embed with muted autoplay.
- `src/components/resume-popup.tsx`: homepage PDF preview dialog and download link.
- `src/data/site.ts`: compact résumé index and fuller detail-page bullets from the PDF.
- `content/about.md`: approved summary, rendered as plain text by the server.
- `src/app/resume.pdf/route.ts`: serves the updated résumé PDF from `content/`.
- `src/styles/theme.css`: all application color/font tokens.
- `public/images/`: only public-page assets; the portrait is a static export and the
  prepared photo copies are written there by `npm run photos`.
- `docs/design/`: original references, source assets, and provenance.

No backend, analytics, auth, chat, or terminal. The two project demo embeds contact
YouTube's privacy-enhanced domain on their detail pages and when Projects popups open. Session storage only
remembers the intro for the current tab. Without JavaScript the full résumé renders
immediately, with a plain link to each demo.
Search indexing stays disabled until publication is approved.

## Quality gates

Build, lint, typecheck, browser inspection, and web-design-guidelines review.
Native links, keyboard navigation, visible focus, reduced motion, high contrast,
and responsive reflow. No horizontal clipping at 320px or 200% text size.
Allow scrolling rather than hiding content or making résumé text unreadably small.
