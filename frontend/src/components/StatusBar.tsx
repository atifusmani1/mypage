// Bottom status bar, VS Code style — branch, path, encoding, indicators.
export default function StatusBar() {
  return (
    <footer className="flex h-6 shrink-0 items-center justify-between bg-status px-3 text-[11px] text-ink/90 select-none border-t border-edge">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3" aria-hidden="true">
            <path d="M6 3v12m0 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0-12a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm12 3h-3a6 6 0 0 0-6 6v1" />
          </svg>
          main
        </span>
        <span className="text-cyan">~/mypage</span>
      </div>
      <div className="flex items-center gap-3">
        <span>bash</span>
        <span>UTF-8</span>
        <span>atifusmani.dev</span>
      </div>
    </footer>
  )
}
