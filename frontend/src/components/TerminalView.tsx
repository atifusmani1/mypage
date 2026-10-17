import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { displayPath, getNode, resolvePath, WELCOME_SCRIPT, type DirNode } from '../data/filesystem'

// ANSI helpers
const T = {
  reset: '\x1b[0m',
  dim: '\x1b[90m',
  green: '\x1b[38;2;74;222;128m',
  cyan: '\x1b[38;2;103;232;249m',
  purple: '\x1b[38;2;197;134;192m',
  comment: '\x1b[38;2;106;153;85m',
  yellow: '\x1b[38;2;251;191;36m',
}

const USER = 'atif'
const HOST = 'mypage'

interface TerminalViewProps {
  onOpenFile: (path: string) => void
}

// The emulated shell inside the editor area.
// 1. Types out the welcome script at a human pace
// 2. Renders a $ prompt with real command handling (ls, cat, cd, tree, …)
export default function TerminalView({ onOpenFile }: TerminalViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const handlersRef = useRef<{ onOpenFile: (path: string) => void }>({ onOpenFile })
  handlersRef.current = { onOpenFile }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 13,
      lineHeight: 1.35,
      fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
      theme: {
        background: '#111114',
        foreground: '#d4d4d8',
        cursor: '#4ade80',
        cursorAccent: '#111114',
        selectionBackground: '#2c3c34',
      },
    })
    const fit = new FitAddon()
    term.loadAddon(fit)
    term.open(container)
    fit.fit()

    const ro = new ResizeObserver(() => fit.fit())
    ro.observe(container)

    let disposed = false
    let cwd: string[] = []
    let line = ''
    const history: string[] = []
    let historyIndex: number | null = null

    const promptString = () =>
      `${T.green}${USER}@${HOST}${T.reset} ${T.cyan}${displayPath(cwd)}${T.reset} ${T.dim}$${T.reset} `

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

    // ── boot sequence: type the welcome script like a human ──────────────
    const boot = async () => {
      await sleep(500)
      for (const text of WELCOME_SCRIPT) {
        const color = text.startsWith('#!') ? T.purple : T.comment
        term.write(color)
        for (const ch of text) {
          if (disposed) return
          term.write(ch)
          await sleep(16 + Math.random() * 34)
        }
        term.write(`${T.reset}\r\n`)
        await sleep(140)
      }
      if (!disposed) term.write(promptString())
    }
    void boot()

    // ── command implementation ───────────────────────────────────────────
    const print = (text: string) => term.write(text.replaceAll('\n', '\r\n') + '\r\n')

    const run = (raw: string) => {
      const input = raw.trim()
      if (!input) return
      history.push(input)
      const [name, ...args] = input.split(/\s+/)

      switch (name) {
        case 'help':
          print(`${T.green}available commands${T.reset}`)
          print(`  ${T.cyan}ls${T.reset} [dir]     list folder contents`)
          print(`  ${T.cyan}cat${T.reset} <file>   print a file`)
          print(`  ${T.cyan}open${T.reset} <file>  open a file in the editor`)
          print(`  ${T.cyan}cd${T.reset} [dir]     change directory`)
          print(`  ${T.cyan}pwd whoami tree date echo clear${T.reset}`)
          print(`  ${T.cyan}chat${T.reset}         focus the chat box below`)
          print(`${T.dim}you can also just ask the chat box — no coding needed${T.reset}`)
          break

        case 'ls': {
          const target = resolvePath(cwd, args[0])
          if (!target) return print(`ls: ${args[0]}: no such file or directory`)
          const node = getNode(target)
          if (!node) return print(`ls: ${args[0]}: no such file or directory`)
          if (node.type === 'file') return print(args[0])
          const entries = Object.entries((node as DirNode).children)
          if (entries.length === 0) return print(`${T.dim}(empty)${T.reset}`)
          const rendered = entries
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([child, childNode]) =>
              childNode.type === 'dir' ? `${T.cyan}\x1b[1m${child}/${T.reset}` : child,
            )
          term.write(rendered.join('  ') + '\r\n')
          break
        }

        case 'cat': {
          if (!args[0]) return print('cat: missing file operand')
          const target = resolvePath(cwd, args[0])
          const node = target && getNode(target)
          if (!node) return print(`cat: ${args[0]}: no such file or directory`)
          if (node.type === 'dir') return print(`cat: ${args[0]}: is a directory`)
          print(node.content)
          break
        }

        case 'open': {
          if (!args[0]) return print('open: missing file operand')
          const target = resolvePath(cwd, args[0])
          const node = target && getNode(target)
          if (!node) return print(`open: ${args[0]}: no such file or directory`)
          if (node.type === 'dir') return print(`open: ${args[0]}: is a directory`)
          print(`${T.dim}opening ${args[0]} in the editor…${T.reset}`)
          handlersRef.current.onOpenFile(target.join('/'))
          break
        }

        case 'cd': {
          const target = resolvePath(cwd, args[0])
          if (!target) return print(`cd: ${args[0] ?? ''}: no such file or directory`)
          const node = getNode(target)
          if (node?.type === 'file') return print(`cd: ${args[0]}: not a directory`)
          cwd = target
          break
        }

        case 'pwd':
          print('/Users/' + USER + (cwd.length ? '/' + cwd.join('/') : ''))
          break

        case 'whoami':
          print(USER)
          break

        case 'tree': {
          const root = getNode(cwd)
          if (!root || root.type !== 'dir') return print('tree: invalid directory')
          print('.')
          const walk = (node: DirNode, prefix: string) => {
            const entries = Object.entries(node.children)
            entries.forEach(([name, child], i) => {
              const last = i === entries.length - 1
              term.write(`${prefix}${last ? '└── ' : '├── '}${child.type === 'dir' ? `${T.cyan}${name}/${T.reset}` : name}\r\n`)
              if (child.type === 'dir') walk(child, prefix + (last ? '    ' : '│   '))
            })
          }
          walk(root, '')
          break
        }

        case 'echo':
          print(args.join(' '))
          break

        case 'date':
          print(new Date().toString())
          break

        case 'clear':
          term.clear()
          break

        case 'history':
          history.forEach((h, i) => print(`  ${i + 1}  ${h}`))
          break

        case 'chat':
          print(`${T.dim}focusing chat…${T.reset}`)
          window.dispatchEvent(new Event('focus-chat'))
          break

        case 'sudo':
          print(`${T.yellow}nice try — permission denied${T.reset}`)
          break

        default:
          print(`zsh: command not found: ${name}  ${T.dim}(try "help")${T.reset}`)
      }
    }

    // ── line editing / key handling ──────────────────────────────────────
    const redrawLine = (text: string) => {
      term.write(`\r\x1b[2K${promptString()}${text}`)
    }

    term.onData((data) => {
      if (disposed) return
      if (data === '\r') {
        // Enter
        term.write('\r\n')
        run(line)
        line = ''
        historyIndex = null
        term.write(promptString())
      } else if (data === '\x7f') {
        // Backspace
        if (line.length > 0) {
          line = line.slice(0, -1)
          term.write('\b \b')
        }
      } else if (data === '\x03') {
        // Ctrl+C
        term.write('^C')
        line = ''
        historyIndex = null
        term.write(promptString())
      } else if (data === '\x0c') {
        // Ctrl+L
        term.clear()
        term.write(promptString() + line)
      } else if (data === '\x1b[A' || data === '\x1b[B') {
        // Arrow up / down — command history
        if (history.length === 0) return
        if (historyIndex === null) historyIndex = history.length
        historyIndex = data === '\x1b[A' ? Math.max(0, historyIndex - 1) : Math.min(history.length, historyIndex + 1)
        const next = history[historyIndex] ?? ''
        line = next
        redrawLine(line)
      } else if (data >= ' ') {
        // printable characters
        line += data
        term.write(data)
      }
      // ignore other control sequences for now
    })

    return () => {
      disposed = true
      ro.disconnect()
      term.dispose()
    }
  }, [])

  return <div ref={containerRef} className="h-full w-full p-3" />
}
