'use client'

import { useEffect, useState } from 'react'
import LiquidGlass from 'liquid-glass-react'
import { sections } from '@/data/site'

export default function GlassNavigation() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const update = () => {
      let current = ''
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = section.id
        }
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <nav aria-label="Main navigation" className="section-navigation">
      {sections.map(({ id, label }) => (
        <div className="navigation-shell" key={id}>
          <LiquidGlass
            className="navigation-glass"
            style={{ position: 'relative', top: 0, left: 0, transform: 'none' }}
            displacementScale={18}
            blurAmount={0.025}
            saturation={100}
            aberrationIntensity={0}
            elasticity={0}
            cornerRadius={50}
            padding="0px"
          >
            <a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
              {label}
            </a>
          </LiquidGlass>
        </div>
      ))}
    </nav>
  )
}
