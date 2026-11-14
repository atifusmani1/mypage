'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { photos } from '@/data/photos'
import { CircleCursor } from './circle-cursor'
import { ThermalText } from './thermal-text'

const TICK_MS = 3000
const FADE_MS = 500
const CLEAR_MS = FADE_MS + 200
const paneCount = 3

function dealPhotos(shuffle = false) {
  const deck = [...photos]
  if (shuffle) {
    for (let index = deck.length - 1; index > 0; index--) {
      const random = Math.floor(Math.random() * (index + 1))
      ;[deck[index], deck[random]] = [deck[random], deck[index]]
    }
  }
  return Array.from({ length: paneCount }, (_, pane) => deck.filter((_, index) => index % paneCount === pane))
}

type Slot = { current: number; previous: number | null }

export function PhotoGallery() {
  // Keep server and hydration markup identical; shuffle once the browser mounts.
  const [panes, setPanes] = useState(dealPhotos)
  const [slots, setSlots] = useState<Slot[]>(() => Array.from({ length: paneCount }, () => ({ current: 0, previous: null })))
  const [hovered, setHovered] = useState<number | null>(null)
  const hoveredPane = useRef<number | null>(null)
  const tick = useRef(0)
  const clearTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timer = setTimeout(() => setPanes(dealPhotos(true)), 0)
    return () => clearTimeout(timer)
  }, [])

  // One pane changes per beat; hovering holds only that pane, not the strip.
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (tick.current % paneCount === hoveredPane.current) tick.current += 1
      const index = tick.current % paneCount
      tick.current += 1
      setSlots(value => value.map((slot, pane) => pane === index
        ? { current: (slot.current + 1) % panes[pane].length, previous: slot.current }
        : slot))
      clearTimers.current.push(setTimeout(() => {
        setSlots(value => value.map((slot, pane) => pane === index ? { ...slot, previous: null } : slot))
      }, CLEAR_MS))
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [panes])

  useEffect(() => () => clearTimers.current.forEach(clearTimeout), [])

  const current = slots.map((slot, index) => panes[index][slot.current])

  return <main className="work-page photo-page">
    <CircleCursor label={hovered === null ? '' : current[hovered].title} />
    <header className="work-header page-width">
      <Link className="thermal-link back-link" href="/"><ThermalText>← Home</ThermalText></Link>
      <h1>Gallery</h1>
    </header>
    <div className="photo-panes">
      {slots.map((slot, index) => {
        const photo = panes[index][slot.current]
        const previous = slot.previous === null ? null : panes[index][slot.previous]
        return <div className="photo-pane" key={index}
          onPointerEnter={event => { if (event.pointerType === 'mouse') { hoveredPane.current = index; setHovered(index) } }}
          onPointerLeave={() => { hoveredPane.current = null; setHovered(null) }}>
          <div className="photo-pane-image">
            <Image src={photo.src} alt={photo.title} fill sizes="(max-width: 760px) 92vw, 31vw" priority={slot.current === 0} />
            {previous && <Image key={previous.src} className="photo-fading" src={previous.src} alt="" fill sizes="(max-width: 760px) 92vw, 31vw" />}
          </div>
        </div>
      })}
    </div>
  </main>
}
