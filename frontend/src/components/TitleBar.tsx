// macOS-style window title bar
export default function TitleBar() {
  return (
    <header className="flex h-9 shrink-0 items-center bg-chrome px-4 text-xs text-dim select-none">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 text-center tracking-wide">
        atifusmani — ~/mypage — bash
      </div>
      <div className="w-16" />
    </header>
  )
}
