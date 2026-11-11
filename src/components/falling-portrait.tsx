'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const SIZE = 1400
// Match the supplied portrait export's character-cell size.
const CELL = 16
const FALL_MS = 700

export function FallingPortrait() {
  const container = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = container.current
    const surface = canvas.current
    if (!host || !surface) return

    const root = document.documentElement
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const source = new window.Image()
    let frame = 0
    let disposed = false
    let started = false
    let sawIntro = root.dataset.intro === 'run'

    function stop() {
      cancelAnimationFrame(frame)
      host!.classList.remove('portrait-assembling')
    }

    function start() {
      if (disposed || started || !sawIntro || root.dataset.intro !== 'done' || motion.matches) return
      if (!source.complete || !source.naturalWidth) return
      started = true

      const context = surface!.getContext('2d')
      if (!context) return

      // Use the existing artwork's glyph-sized fragments, rather than inventing
      // a new character set or changing the finished portrait's color/detail.
      const sample = document.createElement('canvas')
      sample.width = SIZE
      sample.height = SIZE
      const sampleContext = sample.getContext('2d', { willReadFrequently: true })
      if (!sampleContext) return

      try {
        sampleContext.drawImage(source, 0, 0, SIZE, SIZE)
        const pixels = sampleContext.getImageData(0, 0, SIZE, SIZE).data
        const cells: { x: number; y: number; delay: number; width: number; height: number }[] = []

        for (let y = 0; y < SIZE; y += CELL) {
          for (let x = 0; x < SIZE; x += CELL) {
            let visible = false
            for (let dy = 0; dy < CELL && y + dy < SIZE && !visible; dy += 2) {
              for (let dx = 0; dx < CELL && x + dx < SIZE; dx += 2) {
                const offset = ((y + dy) * SIZE + x + dx) * 4
                if (pixels[offset + 3] > 0 && Math.max(pixels[offset], pixels[offset + 1], pixels[offset + 2]) > 30) {
                  visible = true
                  break
                }
              }
            }
            if (!visible) continue
            const column = x / CELL
            cells.push({
              x, y,
              delay: ((column * 37) % 240) + (y / SIZE) * 500,
              width: Math.min(CELL, SIZE - x),
              height: Math.min(CELL, SIZE - y),
            })
          }
        }

        surface!.width = SIZE
        surface!.height = SIZE
        const began = performance.now()
        host!.classList.add('portrait-assembling')

        function draw(now: number) {
          if (disposed || motion.matches) return stop()
          const elapsed = now - began
          context!.clearRect(0, 0, SIZE, SIZE)
          // Dark pixels in adjacent fragments must not cover falling glyphs.
          context!.globalCompositeOperation = 'screen'
          for (const cell of cells) {
            const progress = Math.min(1, Math.max(0, (elapsed - cell.delay) / FALL_MS))
            if (progress === 0) continue
            const eased = 1 - (1 - progress) ** 3
            const top = -CELL + (cell.y + CELL) * eased
            context!.globalAlpha = Math.min(1, progress * 5)
            context!.drawImage(sample, cell.x, cell.y, cell.width, cell.height,
              cell.x, top, cell.width, cell.height)
          }
          context!.globalAlpha = 1
          if (elapsed < 1450) frame = requestAnimationFrame(draw)
          else stop()
        }

        frame = requestAnimationFrame(draw)
      } catch {
        // Canvas/image failures leave the static portrait visible.
        stop()
      }
    }

    const observer = new MutationObserver(() => {
      if (root.dataset.intro === 'run') sawIntro = true
      start()
    })
    observer.observe(root, { attributes: true, attributeFilter: ['data-intro'] })
    source.addEventListener('load', start)
    motion.addEventListener('change', stop)
    if (sawIntro && !motion.matches) source.src = '/images/atif-ascii.png'
    start()

    return () => {
      disposed = true
      observer.disconnect()
      source.removeEventListener('load', start)
      motion.removeEventListener('change', stop)
      stop()
    }
  }, [])

  return (
    <div ref={container} className="hero-portrait" aria-hidden="true">
      <Image src="/images/atif-ascii.png" alt="" width={SIZE} height={SIZE}
        sizes="(max-width: 760px) 160px, 380px" preload className="ascii-portrait" />
      <canvas ref={canvas} className="portrait-fall" />
    </div>
  )
}
