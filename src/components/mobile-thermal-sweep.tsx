'use client'

import { useEffect } from 'react'

/** A one-time touch-only preview of the existing link hover treatment. */
export function MobileThermalSweep() {
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px) and (hover: none) and (pointer: coarse) and (prefers-reduced-motion: no-preference) and (forced-colors: none)')
    if (!mobile.matches) return

    const links = Array.from(document.querySelectorAll<HTMLElement>(
      '.opening-inner .contact-links .thermal-link, .opening-inner .details .thermal-link, .opening-inner .more-life',
    ))
    let index = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    let active: HTMLElement | undefined
    let stopped = false

    const visibility = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || stopped) continue
        visibility.unobserve(entry.target)
        active = entry.target as HTMLElement
        active.classList.add('thermal-sweep')
        timer = setTimeout(() => {
          active?.classList.remove('thermal-sweep')
          active = undefined
          index += 1
          timer = setTimeout(next, 200)
        }, 650)
      }
    }, { threshold: 0.1 })

    function next() {
      if (!stopped && links[index]) visibility.observe(links[index])
    }

    function start() {
      if (document.documentElement.dataset.intro === 'run') return
      intro.disconnect()
      timer = setTimeout(next, 2000)
    }

    function stop() {
      stopped = true
      clearTimeout(timer)
      intro.disconnect()
      visibility.disconnect()
      active?.classList.remove('thermal-sweep')
    }

    const intro = new MutationObserver(start)
    intro.observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] })
    start()
    mobile.addEventListener('change', stop)
    window.addEventListener('keydown', stop)
    document.addEventListener('visibilitychange', onVisibilityChange)

    function onVisibilityChange() {
      if (document.hidden) stop()
    }

    return () => {
      stop()
      mobile.removeEventListener('change', stop)
      window.removeEventListener('keydown', stop)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return null
}
