import { useEffect, useRef, useState } from 'react'
import { sendChat, type ChatMsg } from '../lib/api'

interface Message extends ChatMsg {
  pending?: boolean
  error?: boolean
}

// Docked bottom panel — an opencode-style chat, branded for the site.
// The backend (backend/main.py) is a stub for now; wire a real LLM in later.
export default function ChatPanel() {
  const [height, setHeight] = useState(240)
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
    <section className="flex shrink-0 flex-col border-t border-edge bg-panel" style={{ height: collapsed ? 36 : height }}>
      {/* resize handle */}
      <div
        onMouseDown={!collapsed ? startResize : undefined}
        onDoubleClick={() => setCollapsed((c) => !c)}
        className={`h-1.5 shrink-0 ${collapsed ? '' : 'cursor-row-resize'} hover:bg-accent/30`}
      />

      <header className="flex h-7 shrink-0 items-center gap-2 px-3 text-[11px] tracking-widest text-dim uppercase select-none">
        <SparkleIcon />
        chat — atif's assistant
        <span className={`h-1.5 w-1.5 rounded-full ${busy ? 'animate-pulse bg-amber' : 'bg-accent'}`} />
        <span className="flex-1" />
        <button onClick={() => setCollapsed((c) => !c)} className="p-0.5 hover:text-ink" title={collapsed ? 'expand' : 'collapse'}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`h-3.5 w-3.5 transition-transform ${collapsed ? '' : 'rotate-180'}`}
          >
            <path d="m6 15 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {!collapsed && (
        <>
          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 pb-2">
            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] rounded border-r-2 border-amber/70 bg-chrome/70 px-3 py-2 text-[13px] whitespace-pre-wrap">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className={`max-w-[85%] rounded border-l-2 px-3 py-2 text-[13px] whitespace-pre-wrap ${
                    m.error ? 'border-red-400/70 bg-red-400/5 text-red-200/90' : 'border-accent/60 bg-chrome/60 text-ink/90'
                  }`}
                >
                  {m.pending ? <TypingDots /> : m.content}
                </div>
              ),
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 border-t border-edge px-3 py-2.5">
            <span className="text-accent select-none">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && void send()}
              placeholder="ask me anything…"
              className="flex-1 bg-transparent text-[13px] text-ink placeholder:text-dim/70 focus:outline-none"
            />
            <span className="text-[11px] text-dim/70 select-none">↵ send</span>
          </div>
        </>
      )}
    </section>
  )
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </span>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-accent">
      <path d="M12 3v18M3 12h18m-4-7L7 19M7 5l10 14" strokeLinecap="round" />
    </svg>
  )
}
