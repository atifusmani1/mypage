'use client'

import dynamic from 'next/dynamic'
import { sections } from '@/data/site'

const GlassNavigation = dynamic(() => import('./GlassNavigation'), {
  ssr: false,
  loading: () => (
    <nav aria-label="Main navigation" className="section-navigation">
      {sections.map(({ id, label }) => <a className="navigation-fallback" key={id} href={`#${id}`}>{label}</a>)}
    </nav>
  ),
})

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="site-name" href="#home" translate="no">Atif Usmani</a>
        <GlassNavigation />
      </div>
    </header>
  )
}
