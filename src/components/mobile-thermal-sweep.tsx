'use client'

import { useEffect } from 'react'

/** Brief, one-time touch-only preview of the link hover treatment. */
export function MobileThermalSweep() {
  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px) and (hover: none) and (pointer: coarse) and (prefers-reduced-motion: no-preference) and (forced-colors: none)')
    const links = Array.from(document.querySelectorAll<HTMLElement>(
      '.opening-inner .contact-links .thermal-link, .opening-inner .details .thermal-link, .opening-inner .more-life',
    ))
    let index = 0
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
      if (document.hidden || !mobile.matches || index >= links.length) return
      const link = links[index]
      active = link
      link.classList.add('thermal-sweep')
      fadeTimer = setTimeout(() => {
        link.classList.remove('thermal-sweep')
        active = undefined
      }, 300)

      timer = setTimeout(() => {
        index += 1
        step()
      }, 370)
    }

    function start() {
      if (document.documentElement.dataset.intro === 'run') return
      intro.disconnect()
      ready = true
      if (mobile.matches && !document.hidden) timer = setTimeout(step, 2000)
    }

    function onVisibilityChange() {
      if (document.hidden) clearStep()
      else if (ready && mobile.matches && index < links.length) timer = setTimeout(step, 350)
    }

    function onMobileChange() {
      clearStep()
      if (ready && mobile.matches && !document.hidden && index < links.length) timer = setTimeout(step, 350)
    }

    const intro = new MutationObserver(start)
    intro.observe(document.documentElement, { attributes: true, attributeFilter: ['data-intro'] })
    start()
    document.addEventListener('visibilitychange', onVisibilityChange)
    mobile.addEventListener('change', onMobileChange)

    return () => {
      clearStep()
      intro.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      mobile.removeEventListener('change', onMobileChange)
    }
  }, [])

  return null
}
