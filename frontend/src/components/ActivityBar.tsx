// Leftmost icon strip, like VS Code's activity bar.
// Only the explorer is wired up for now; the rest are placeholders.

const icons = [
  {
    id: 'explorer',
    label: 'Explorer',
    active: true,
    path: (
      <path d="M4 6a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" />
    ),
  },
  {
    id: 'search',
    label: 'Search (coming soon)',
    active: false,
    path: <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm5 11 4 4" />,
  },
  {
    id: 'git',
    label: 'Source Control (coming soon)',
    active: false,
    path: <path d="M6 3v12m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-12a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm12 3h-3a6 6 0 0 0-6 6v1" />,
  },
  {
    id: 'chat',
    label: 'Chat (use the panel below)',
    active: false,
    path: <path d="M4 5h16v10H9l-5 4V5Z" />,
  },
]

export default function ActivityBar() {
  return (
    <nav className="flex w-12 shrink-0 flex-col items-center gap-1 bg-chrome py-2">
      {icons.map(({ id, label, active, path }) => (
        <button
          key={id}
          title={label}
          aria-label={label}
          className={`flex h-10 w-10 items-center justify-center rounded ${
            active ? 'text-accent' : 'text-dim hover:text-ink'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            {path}
          </svg>
        </button>
      ))}
      <div className="flex-1" />
      <button title="atifusmani" className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-edge text-xs text-ink">
        AU
      </button>
    </nav>
  )
}
