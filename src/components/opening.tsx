'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

const PHRASES = ['Welcome!', 'Always Building.', 'Always Learning.']
const TYPE_MS = 55
const LINE_PAUSE_MS = 320
const HOLD_MS = 900

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

type OpeningProps = {
  summary: ReactNode
  portrait: ReactNode
  children: ReactNode
}

/**
 * Runs the one-time typing intro, then reveals the page content.
 * The bootstrap script in the root layout sets `data-intro="run"` before paint
 * only when the intro should play, so returning visits never flash hidden copy.
 */
export function Opening({ summary, portrait, children }: OpeningProps) {
  const [text, setText] = useState('')
  const cancelled = useRef(true)

  const finish = useCallback((animate: boolean) => {
    cancelled.current = true
    setText('')
    document.documentElement.dataset.intro = animate ? 'done' : 'static'
    try {
      window.sessionStorage.setItem('intro-seen', '1')
    } catch {
      // Storage can be unavailable in private contexts; the intro still ends.
    }
  }, [])

  // Returning visits only settle the bootstrap attribute; nothing needs to
  // re-render because CSS already keeps the intro area hidden.
  const settle = useCallback(() => {
    cancelled.current = true
    document.documentElement.dataset.intro = 'static'
    try {
      window.sessionStorage.setItem('intro-seen', '1')
    } catch {
      // Storage can be unavailable in private contexts; the intro still ends.
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const shouldRun =
      root.dataset.intro === 'run' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!shouldRun) {
      settle()
      return
    }

    cancelled.current = false
    let disposed = false

    async function play() {
      let typed = ''

      for (const [lineIndex, phrase] of PHRASES.entries()) {
        if (lineIndex > 0) {
          typed += '\n'
          setText(typed)
          if (disposed || cancelled.current) return
          await sleep(LINE_PAUSE_MS)
        }

        for (const character of phrase) {
          if (disposed || cancelled.current) return
          typed += character
          setText(typed)
          await sleep(TYPE_MS)
        }
      }

      if (disposed || cancelled.current) return
      await sleep(HOLD_MS)
      if (disposed || cancelled.current) return
      finish(true)
    }

    void play()

    return () => {
      disposed = true
      cancelled.current = true
    }
  }, [finish, settle])

  return (
    <div className="opening-inner page-width">
      <h1 className="site-name" translate="no">Atif Usmani</h1>

      <div className="hero">
        <p className="intro-text" aria-hidden="true">
          {text}
          <span className="intro-caret" />
        </p>
      </div>

      <aside className="identity" aria-label="About Atif and contact">
        {portrait}
        <div className="identity-summary">{summary}</div>
      </aside>
      {children}
    </div>
  )
}
