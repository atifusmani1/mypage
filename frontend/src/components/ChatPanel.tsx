import { useEffect, useRef, useState } from 'react'
import { sendChat, type ChatMsg } from '../lib/api'

interface Message extends ChatMsg {
  pending?: boolean
  error?: boolean
  thinking?: boolean
}

// Docked bottom panel — opencode TUI style, branded for the site.
// Pure black, bright green text, split conversation + context sidebar.
// The backend (backend/main.py) is a stub for now; wire a real LLM in later.
export default function ChatPanel() {
  const [height, setHeight] = useState(300)
  const [collapsed, setCollapsed] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "hey! i'm atif's assistant — still in beta. ask me anything about the site, or say hi.\n\n(the LLM isn't wired up yet, so my replies are stubbed for now.)",
    },
  ])
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // terminal's `chat` command focuses the input
  useEffect(() => {
    const focus = () => inputRef.current?.focus()
    window.addEventListener('focus-chat', focus)
    return () => window.removeEventListener('focus-chat', focus)
  }, [])

  // keep the newest message in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // drag-to-resize the panel
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault()
    const startY = e.clientY
    const startHeight = height
    const onMove = (ev: MouseEvent) => {
      const dy = startY - ev.clientY
      setHeight(Math.min(Math.max(160, startHeight + dy), window.innerHeight - 300))
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const send = async () => {
    const message = input.trim()
    if (!message || busy) return
    setInput('')
    setBusy(true)

    const history: ChatMsg[] = messages
      .filter((m) => !m.pending && !m.error)
      .slice(-10)
      .map(({ role, content }) => ({ role, content }))

    setMessages((prev) => [...prev, { role: 'user', content: message }, { role: 'assistant', content: '', pending: true }])

    try {
      const reply = await sendChat(message, history)
      setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'assistant',
          content: `couldn't reach the chat backend (${err instanceof Error ? err.message : 'unknown error'}). is \`backend\` running? see the README.`,
          error: true,
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="flex shrink-0 flex-col border-t border-edge bg-editorbg" style={{ height: collapsed ? 36 : height }}>
      {/* resize handle */}
      <div
        onMouseDown={!collapsed ? startResize : undefined}
        onDoubleClick={() => setCollapsed((c) => !c)}
        className={`h-1 shrink-0 ${collapsed ? '' : 'cursor-row-resize'} hover:bg-green/10`}
      />

      {/* VS Code style panel tabs */}
      <div className="flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-edge bg-chrome text-[12px]">
        <div
          role="tab"
          tabIndex={0}
          aria-selected="true"
          className="flex cursor-pointer items-center gap-2 border-r border-edge px-3 whitespace-nowrap select-none bg-editorbg text-ink border-b-2 border-b-green"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-green/80 shrink-0" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Chat
        </div>
        <div
          role="tab"
          tabIndex={-1}
          aria-selected="false"
          className="flex cursor-pointer items-center gap-2 border-r border-edge px-3 whitespace-nowrap select-none text-dim hover:text-ink hover:bg-white/5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-dim shrink-0" aria-hidden="true">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          </svg>
          Terminal
        </div>
        <div className="flex-1" />
      </div>

      {/* split pane: conversation left, context sidebar right */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* conversation area */}
        <div className="flex min-w-0 flex-1 flex-col border-r border-edge">
          {!collapsed && (
            <>
              <div ref={scrollRef} className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3" role="log" aria-live="polite">
                {messages.map((m, i) =>
                  m.role === 'user' ? (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[80%] rounded border border-amber/50 bg-green/5 px-3 py-2 text-[12px] whitespace-pre-wrap text-ink">
                        {m.content}
                      </div>
                    </div>
                  ) : m.thinking ? (
                    <div key={i} className="flex gap-2">
                      <div className="max-w-[85%] rounded border border-green/40 bg-green/5 px-3 py-2 text-[12px] whitespace-pre-wrap text-green">
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                          + Thought
                        </span>
                        {m.content}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex gap-2">
                      <div className={`max-w-[85%] rounded border-l-2 px-3 py-2 text-[12px] whitespace-pre-wrap ${
                        m.error ? 'border-error/70 bg-error/10 text-error' : 'border-green/60 text-green'
                      }`}>
                        {m.pending ? (
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
                            {m.content}
                          </span>
                        ) : (
                          m.content
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* model / status bar */}
              <div className="flex h-6 shrink-0 items-center justify-between border-t border-edge px-3 text-[11px] text-dim/80 bg-chrome">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green" />
                    CLONE • Nemotron 3.5 Super VL Free
                  </span>
                  <span className="text-green">OpenCode • low</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan">~/projects/mypage:main</span>
                  <span>ctrl+p commands</span>
                </div>
              </div>

              {/* input area */}
              <div className="flex shrink-0 items-center gap-2 border-t border-edge px-3 py-2.5 bg-chrome/40">
                <span className="text-green select-none">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && void send()}
                  aria-label="Chat message"
                  placeholder="ask me anything…"
                  className="flex-1 bg-transparent text-[12px] text-ink placeholder:text-dim/70 focus-visible:ring-1 focus-visible:ring-green"
                  autoComplete="off"
                  name="chat-message"
                  type="text"
                  spellCheck={false}
                />
                <span className="text-[10px] text-dim/70 select-none">↵ send</span>
              </div>
            </>
          )}
        </div>

        {/* context sidebar (right) */}
        {!collapsed && (
          <div className="w-80 shrink-0 flex flex-col border-l border-edge bg-panel text-[12px]">
            <div className="flex h-9 shrink-0 items-center px-3 border-b border-edge text-[11px] tracking-wider text-dim uppercase select-none bg-chrome">
              Context
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] text-dim/70 uppercase tracking-wider">
                  <span>Context</span>
                  <span className="text-green">74,850 tokens</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-ink">7%</span>
                  <span className="text-dim/70">used</span>
                </div>
                <div className="w-full bg-black/40 rounded h-1.5">
                  <div className="bg-green h-1.5 rounded" style={{ width: '7%' }} />
                </div>
              </div>

              <div className="rounded border border-edge/50 bg-chrome/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] text-dim uppercase tracking-wider">Getting started</span>
                  <button className="ml-auto p-1 hover:bg-white/5 rounded" aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 text-dim" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <p className="text-[11px] text-ink/80 leading-relaxed">
                  OpenCode includes free models so you can start immediately.
                </p>
                <p className="mt-2 text-[11px] text-ink/80 leading-relaxed">
                  Connect from 75+ providers to use other models, including
                  Claude, GPT, Gemini etc.
                </p>
                <button
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded border border-green/50 bg-green/5 px-3 py-1.5 text-[11px] text-green hover:bg-green/10 transition-colors"
                >
                  Connect provider
                  <span className="text-[10px] text-dim/70">/connect</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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
    </section>
  )
}
