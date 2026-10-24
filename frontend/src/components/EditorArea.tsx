import ChatPanel from './ChatPanel'
import TerminalView from './TerminalView'
import { getNode } from '../data/filesystem'

export type Tab =
  | { kind: 'terminal'; id: 'terminal'; label: string }
  | { kind: 'file'; id: string; path: string; label: string }

interface EditorAreaProps {
  tabs: Tab[]
  activeTab: string
  onSelectTab: (id: string) => void
  onCloseTab: (id: string) => void
  onOpenFile: (path: string) => void
}

// Center region: editor tabs on top, the open editor (terminal or a file)
// in the middle, and the chat panel docked at the bottom — opencode style.
export default function EditorArea({ tabs, activeTab, onSelectTab, onCloseTab, onOpenFile }: EditorAreaProps) {
  const active = tabs.find((t) => t.id === activeTab)
  const activeFile = active?.kind === 'file' ? getNode(active.path.split('/')) : null

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-editorbg">
      {/* tab bar */}
      <div role="tablist" aria-label="Open editors" className="flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-edge bg-chrome text-[13px]">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tab"
            tabIndex={0}
            aria-selected={tab.id === activeTab}
            onClick={() => onSelectTab(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectTab(tab.id)
              }
            }}
            className={`group flex cursor-pointer items-center gap-2 border-r border-edge px-4 whitespace-nowrap select-none ${
              tab.id === activeTab ? 'bg-editorbg text-ink' : 'text-dim hover:bg-white/5 hover:text-ink/80'
            }`}
          >
            {tab.kind === 'terminal' ? <TerminalIcon /> : <FileIcon />}
            {tab.label}
            {tab.kind === 'file' && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onCloseTab(tab.id)
                }}
                className="rounded p-0.5 text-dim opacity-0 group-hover:opacity-100 hover:bg-white/10 hover:text-ink"
                aria-label={`Close ${tab.label}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* editor surface — terminal stays mounted (hidden) so its history survives tab switches */}
      <div className="relative min-h-0 flex-1">
        <div className={`absolute inset-0 min-h-0 ${active?.kind === 'terminal' ? '' : 'hidden'}`}>
          <TerminalView onOpenFile={onOpenFile} />
        </div>
        {active?.kind === 'file' && activeFile?.type === 'file' && (
          <FileView path={active.path} content={activeFile.content} />
        )}
      </div>

      <ChatPanel />
    </main>
  )
}

function FileView({ path, content }: { path: string; content: string }) {
  const lines = content.split('\n')
  return (
    <div className="absolute inset-0 overflow-auto p-4 text-[13px] leading-relaxed">
      <div className="mb-3 text-[11px] tracking-widest text-dim uppercase">~/{path}</div>
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="w-8 shrink-0 pr-4 text-right text-dim select-none">{i + 1}</span>
          <span className="whitespace-pre-wrap text-ink/90">{line || ' '}</span>
        </div>
      ))}
    </div>
  )
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-accent/80">
      <path d="m5 7 5 5-5 5m8 2h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-dim">
      <path d="M7 3h7l4 4v14H7V3Zm7 0v4h4" strokeLinejoin="round" />
    </svg>
  )
}
