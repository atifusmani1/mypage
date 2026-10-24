import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { displayPath, getNode, resolvePath, type DirNode } from '../data/filesystem'
import { loadImageAsAscii } from '../lib/imageToAscii'

// ANSI helpers — values mirror the @theme tokens in index.css
const T = {
  reset: '\x1b[0m',
  red: '\x1b[38;2;255;107;102m', // --color-error (#ff6b66)
  dim: '\x1b[38;2;133;133;133m', // --color-dim (#858585)
  green: '\x1b[38;2;74;222;128m', // --color-accent (#4ade80)
  cyan: '\x1b[38;2;92;225;255m', // --color-cyan (#5ce1ff)
  white: '\x1b[1;38;2;204;204;204m', // bold --color-ink (#cccccc)
  yellow: '\x1b[38;2;255;214;10m', // --color-amber (#ffd60a)
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
        background: '#000000',
        foreground: '#cccccc',
        cursor: '#4ade80',
        cursorAccent: '#000000',
        selectionBackground: '#1e3d28',
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

    // ── boot sequence: print the ASCII headshot portrait ─────────────────
    const boot = async () => {
      // honor prefers-reduced-motion: print instantly instead of typing
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      await sleep(reduced ? 0 : 300)

      // load and render the headshot as ASCII art in terminal green
      const portrait = await loadImageAsAscii('/headshot.png', 64)
      if (portrait) {
        term.write(T.green)
        if (reduced) {
          term.write(portrait)
        } else {
          // print the portrait line by line for a quick reveal effect
          const lines = portrait.split('\n')
          for (const line of lines) {
            if (disposed) return
            term.write(line + '\r\n')
            await sleep(20)
          }
        }
        term.write(T.reset)
        term.write('\r\n')
        if (!disposed && !reduced) await sleep(200)
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
          print(`${T.white}available commands${T.reset}`)
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
          if (!target) return print(`${T.red}ls: ${args[0]}: no such file or directory${T.reset}`)
          const node = getNode(target)
          if (!node) return print(`${T.red}ls: ${args[0]}: no such file or directory${T.reset}`)
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
          if (!args[0]) return print(`${T.red}cat: missing file operand${T.reset}`)
          const target = resolvePath(cwd, args[0])
          const node = target && getNode(target)
          if (!node) return print(`${T.red}cat: ${args[0]}: no such file or directory${T.reset}`)
          if (node.type === 'dir') return print(`${T.red}cat: ${args[0]}: is a directory${T.reset}`)
          print(node.content)
          break
        }

        case 'open': {
          if (!args[0]) return print(`${T.red}open: missing file operand${T.reset}`)
          const target = resolvePath(cwd, args[0])
          const node = target && getNode(target)
          if (!node) return print(`${T.red}open: ${args[0]}: no such file or directory${T.reset}`)
          if (node.type === 'dir') return print(`${T.red}open: ${args[0]}: is a directory${T.reset}`)
          print(`${T.dim}opening ${args[0]} in the editor…${T.reset}`)
          handlersRef.current.onOpenFile(target.join('/'))
          break
        }

        case 'cd': {
          const target = resolvePath(cwd, args[0])
          if (!target) return print(`${T.red}cd: ${args[0] ?? ''}: no such file or directory${T.reset}`)
          const node = getNode(target)
          if (node?.type === 'file') return print(`${T.red}cd: ${args[0]}: not a directory${T.reset}`)
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
          print(`${T.red}zsh: command not found: ${name}${T.reset}  ${T.dim}(try "help")${T.reset}`)
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
