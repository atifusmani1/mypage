# Rebuild acceptance checklist

Unchecked items are future gates, not completed tests. Every implementation unit must pass `npm run build` in frontend before its local commit.

## Reference fidelity
- [ ] Compare same-size screenshots at 1440×900 and 1280×800 against approved references.
- [ ] Distinct workbench/editor/TUI/composer surfaces; one application status bar.
- [ ] Recognizable supplied portrait, introduction to its right, unobstructed prompt.
- [ ] User messages are wide left-aligned rail blocks, assistant text is unboxed, metadata below response.
- [ ] Composer is a large highlighted box with internal mode/provider row and footer below.
- [ ] Context column matches the reference proportions and contains no invented metrics.
- [ ] User approves portrait readability and visual comparison.

## Responsive and accessible
- [ ] 320/375/768/1280/1440 widths, short landscape, 200% zoom and mobile keyboard checked in browser.
- [ ] Keyboard-only Explorer → tabs → terminal → chat → settings/palette → back; no hidden or lost focus.
- [ ] Splitters support keyboard, touch/pointer and click presets; collapse/maximize restore state.
- [ ] Names/roles/states checked in accessibility tree and manual VoiceOver session; terminal has usable text equivalent.
- [ ] Normal text ≥4.5:1, meaningful controls/focus ≥3:1 using computed blended colors.
- [ ] Reduced-motion disables boot pacing, pulse, blinking and smooth auto-scroll; skip/replay work.
- [ ] Send, newline, IME composition, paste, error, retry and cancellation work with keyboard and pointer.
- [ ] Forced colors, long filenames/URLs, empty content, font failure and slow asset loading checked.
- [ ] Native semantics, skip link, modal focus return and appropriately batched live announcements.

## Terminal/filesystem regression cases
- [ ] `cd about` then `ls` lists about, not root; `cat ~/README.md` and root paths resolve from root.
- [ ] `..` cannot escape virtual root; missing paths/files-as-directories/constructor/toString rejected.
- [ ] Every advertised command has success/help/error cases; unknown commands fail safely.
- [ ] Ctrl+C/L, wrapped command recall, Unicode, multiline paste and escape sequences do not corrupt prompt.
- [ ] Input during boot, missing/empty portrait, reduced motion, rapid tab switching and unmount leave one prompt.
- [ ] Terminal history survives tab switches; `chat` expands then focuses the composer.
- [ ] No command touches a real filesystem, shell or privileged network tool.

## Chat/backend
- [ ] Health checked after backend changes: start `.venv/bin/uvicorn main:app --port 8000`, curl `/api/health`.
- [ ] Stub mode clearly identified; real mode receives approved grounded content and bounded complete history.
- [ ] Whitespace-only/oversize/invalid roles rejected; response JSON validated on frontend.
- [ ] Offline, timeout, 422, 429, 5xx, malformed response, cancel and retry do not lose draft or duplicate turns.
- [ ] Streaming parser handles split frames/UTF-8, partial errors, disconnect and missing completion event.
- [ ] Model/usage/context percentages reflect real metadata or explicitly unavailable/estimated values.
- [ ] Prompt injection cannot add tools, expose secrets or turn portfolio into host execution.
- [ ] Body, concurrency, rate and global spend limits verified in intended deployment topology.
- [ ] No secret in build bundle/logs; production API origin/proxy/CORS and privacy notice verified.

## Engineering/release
- [ ] Approved unit/component/API/browser tests run; record commands, versions and failures.
- [ ] `npm run lint` and `npm run build` pass; no console errors in dev/production preview.
- [ ] Review actual changed UI files with web-design-guidelines; resolve blockers, document remaining nonblockers.
- [ ] Performance measured under slow network/CPU and long transcripts; no surprise autoscroll or layout shifts.
- [ ] README/build-concept/file maps accurate; no secrets, artifacts, venv or dependencies staged.
- [ ] Local scoped Conventional Commits created; user alone publishes.
