# Workbench scaffold — not implemented

Future home of TitleBar, ActivityBar, Sidebar/Explorer, EditorArea/tab components, StatusBar and panel chrome. Existing components remain in their original locations and imports continue to work.

During build-plan phases 1 and 4, move components with import updates and verify each unit. Shared pane state/command registry belongs in `src/lib/workbench/`, shared public content stays in `src/data/`. One component per file; no colors or personal content duplicated here.
