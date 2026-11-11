'use client'

import { useEffect, useId, useRef } from 'react'

export function CircleCursor({ label = '' }: { label?: string }) {
  const cursor = useRef<HTMLDivElement>(null)
  const pathId = useId()

  useEffect(() => {
    const node = cursor.current
    if (!node) return
    const enabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)')
    let frame = 0

    function hide() {
      cancelAnimationFrame(frame)
      node!.hidden = true
      document.documentElement.classList.remove('circle-cursor-active')
    }

    function move(event: PointerEvent) {
      if (!enabled.matches || event.pointerType !== 'mouse') return hide()
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        node!.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
        node!.hidden = false
        document.documentElement.classList.add('circle-cursor-active')
      })
    }

    function key(event: KeyboardEvent) {
      if (event.key === 'Tab') hide()
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    window.addEventListener('keydown', key)
    enabled.addEventListener('change', hide)
    return () => {
      cancelAnimationFrame(frame)
      hide()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      window.removeEventListener('keydown', key)
      enabled.removeEventListener('change', hide)
    }
  }, [])

  return <div ref={cursor} className={`circle-cursor${label ? ' circle-cursor-expanded' : ''}`} hidden aria-hidden="true">
    {label && <svg className="cursor-title" viewBox="0 0 160 160">
      <defs><path id={pathId} d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0" /></defs>
      <text><textPath href={`#${pathId}`} startOffset="0%">{label}</textPath></text>
    </svg>}
  </div>
}
