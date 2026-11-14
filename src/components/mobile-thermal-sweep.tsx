'use client'

import { useEffect, useRef, useState } from 'react'

/** Touch-only thermal hover preview, sweeping down and back up the links. */
export function MobileThermalSweep() {
  const [available, setAvailable] = useState(false)
  const [playing, setPlaying] = useState(true)
  const position = useRef(0)
  const direction = useRef(1)
  const startedOnce = useRef(false)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px) and (hover: none) and (pointer: coarse) and (prefers-reduced-motion: no-preference) and (forced-colors: none)')
    function update() { setAvailable(mobile.matches) }
    update()
    mobile.addEventListener('change', update)
    return () => mobile.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!available || !playing) return

    const links = Array.from(document.querySelectorAll<HTMLElement>(
      '.opening-inner .contact-links .thermal-link, .opening-inner .details .thermal-link, .opening-inner .more-life',
    ))
    if (!links.length) return

    let timer: ReturnType<typeof setTimeout> | undefined
    let fadeTimer: ReturnType<typeof setTimeout> | undefined
    let active: HTMLElement | undefined
    let ready = false

    function clearStep() {
      clearTimeout(timer)
      clearTimeout(fadeTimer)
      active?.classList.remove('thermal-sweep')
      active = undefined
    }

    function step() {
      if (document.hidden) return
      const link = links[position.current]
      active = link
      link.classList.add('thermal-sweep')
      fadeTimer = setTimeout(() => {
        link.classList.remove('thermal-sweep')
        active = undefined
      }, 1050)

      timer = setTimeout(() => {
        if (position.current === links.length - 1) direction.current = -1
        else if (position.current === 0) direction.current = 1
        position.current += direction.current
        step()
      }, 1350)
    }

    function start() {
      if (document.documentElement.dataset.intro === 'run') return
      intro.disconnect()
      ready = true
      if (!document.hidden) {
        timer = setTimeout(step, startedOnce.current ? 0 : 2000)
        startedOnce.current = true
      }
    }

    function onVisibilityChange() {
      if (document.hidden) clearStep()
      else if (ready) timer = setTimeout(step, 350)
    }

    const intro = new MutationObserver(start)
    intro.observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] })
    start()
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      clearStep()
      intro.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [available, playing])

  if (!available) return null
  return (
    <button className="thermal-sweep-toggle" type="button" onClick={() => setPlaying(value => !value)}>
      {playing ? 'Pause thermal effect' : 'Resume thermal effect'}
    </button>
  )
}
