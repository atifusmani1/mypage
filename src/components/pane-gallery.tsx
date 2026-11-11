'use client'

import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import entg from '../../content/image-panes/work/entg-logo-removebg-preview.png'
import caliber from '../../content/image-panes/work/caliber-boards-logo-removebg-preview.png'
import cusm from '../../content/image-panes/work/cusm-logo-Photoroom.png'
import solar from '../../content/image-panes/projects/solar-shield-removebg-preview.png'
import parallax from '../../content/image-panes/projects/parallax-removebg-preview.png'
import type { ResumeDetail } from '@/data/site'
import { CircleCursor } from './circle-cursor'
import { ThermalText } from './thermal-text'
import { ProjectVideo } from './project-video'

export type GalleryPane = {
  slug: string
  image: StaticImageData
  label: string
  figures?: { image: StaticImageData; alt: string }[]
}

const workPanes: GalleryPane[] = [
  { slug: 'entegris', image: entg, label: 'Entegris Systems Engineer' },
  { slug: 'caliber-boards', image: caliber, label: 'Caliber Boards ML Engineer' },
  { slug: 'cusm', image: cusm, label: 'CUSM Data Analyst' },
]
const projectPanes: GalleryPane[] = [
  { slug: 'solar-shield', image: solar, label: 'Solar Shield' },
  { slug: 'parallax-ai', image: parallax, label: 'Parallax AI' },
]

type Category = 'experience' | 'projects' | 'research'

export function PaneGallery({ entries, category, panes: supplied }: { entries: ResumeDetail[]; category: Category; panes?: GalleryPane[] }) {
  const projects = category === 'projects'
  const research = category === 'research'
  const wide = projects || research
  const panes = supplied ?? (projects ? projectPanes : workPanes)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLAnchorElement | null>(null)
  const [selected, setSelected] = useState<ResumeDetail | null>(null)
  const [cursorLabel, setCursorLabel] = useState('')

  function open(event: MouseEvent<HTMLAnchorElement>, entry: ResumeDetail) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    trigger.current = event.currentTarget
    setSelected(entry)
    setCursorLabel('')
    dialog.current?.showModal()
    document.documentElement.classList.remove('circle-cursor-active')
  }

  function close() { dialog.current?.close() }

  const figures = selected && research ? panes.find(pane => pane.slug === selected.slug)?.figures : undefined

  return <main className="work-page">
    <CircleCursor label={cursorLabel} />
    <header className="work-header page-width">
      <Link className="thermal-link back-link" href="/"><ThermalText>← Home</ThermalText></Link>
      <h1>{projects ? 'Projects' : research ? 'Research' : 'Work'}</h1>
    </header>
    <div className={`work-panes${wide ? ' project-panes' : ''}`}>
      {panes.map(pane => {
        const entry = entries.find(item => item.slug === pane.slug)
        if (!entry) return null
        return <a key={pane.slug} className={`work-pane${research ? ' research-pane' : ''}`} href={`/${category}/${pane.slug}`}
          aria-label={pane.label} aria-haspopup="dialog" onClick={event => open(event, entry)}
          onPointerEnter={event => { if (event.pointerType === 'mouse') setCursorLabel(pane.label) }}
          onPointerLeave={() => setCursorLabel('')}>
          <div className="work-pane-image"><Image src={pane.image} alt="" sizes={research ? '10rem' : wide ? '(max-width: 760px) 90vw, 45vw' : '(max-width: 760px) 90vw, 30vw'} priority /></div>
          {research && <p className="research-pane-label">{pane.label}</p>}
        </a>
      })}
    </div>
    <dialog ref={dialog} className={`work-dialog${wide ? ' project-dialog' : ''}`} aria-labelledby="work-dialog-title"
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close()
      }}
      onClose={() => { setSelected(null); trigger.current?.focus() }}>
      <button className="work-dialog-close thermal-link" onClick={close}>Close <span aria-hidden="true">×</span></button>
      {selected && <article>
        <h2 id="work-dialog-title">{selected.title}</h2>
        {projects ? <>
          {selected.video && <ProjectVideo key={selected.slug} id={selected.video.id} title={selected.video.title} />}
          <p className="project-description">{selected.description}</p>
        </> : <>
          <p className="detail-role">{selected.role}</p>
          <p className="detail-period">{[selected.period, selected.location].filter(Boolean).join(' · ')}</p>
          <ul className="detail-points">{selected.points.map(point => <li key={point}>{point}</li>)}</ul>
          {figures && figures.length > 0 && <div className="research-figures">
            {figures.map(figure => <Image key={figure.alt} src={figure.image} alt={figure.alt} sizes="(max-width: 760px) 84vw, 24rem" />)}
          </div>}
        </>}
      </article>}
    </dialog>
  </main>
}
