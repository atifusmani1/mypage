# Skill sources

All skills in this directory are vendored snapshots of external repositories,
copied for offline, in-project use. Refresh by re-downloading from the pinned
commits below.

| Skill | Source repo | Pinned commit | Vendored on |
|---|---|---|---|
| `web-design-guidelines` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `063bee94c3` | 2026-10-16 |
| `web-design-guidelines/references/web-interface-guidelines.md` | [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines) | `434b7f9136` | 2026-10-16 |
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills) (`skills/frontend-design`) | `dbd4588f9e` | 2026-10-16 |
| `building-components` | [vercel/components.build](https://github.com/vercel/components.build) (`skills/building-components`) | `ba72745043` | 2026-10-16 |
| `better-accessibility` | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `4c66b1fa86` | 2026-10-16 |
| `better-colors` | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `4c66b1fa86` | 2026-10-16 |
| `better-layout` | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `4c66b1fa86` | 2026-10-16 |
| `better-typography` | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `4c66b1fa86` | 2026-10-16 |
| `better-ui` | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `4c66b1fa86` | 2026-10-16 |
| `better-writing` | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | `4c66b1fa86` | 2026-10-16 |

Licenses: jakubkrehel/skills and vercel-labs/web-interface-guidelines are MIT;
anthropics/skills and vercel skills are provided under their respective repo
licenses. This file records provenance only; no code was modified except
`web-design-guidelines/SKILL.md`, which was adapted to read the vendored
guidelines snapshot locally instead of fetching it from the network.

Refresh command (per skill):

```bash
curl -fsSL https://raw.githubusercontent.com/<repo>/<branch>/<path> -o <dest>
```
