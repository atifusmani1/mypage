// macOS-style window title bar, VS Code chrome.
export default function TitleBar() {
  return (
    <header className="flex h-9 shrink-0 items-center bg-chrome px-4 text-xs text-ink select-none">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 text-center tracking-wide">
        atifusmani — ~/mypage — bash
      </div>
      <div className="w-16" />
    </header>
  )
}
