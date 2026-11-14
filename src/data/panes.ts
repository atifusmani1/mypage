import type { StaticImageData } from 'next/image'
import entg from '../../content/image-panes/work/entg-logo-removebg-preview.png'
import caliber from '../../content/image-panes/work/caliber-boards-logo-removebg-preview.png'
import cusm from '../../content/image-panes/work/cusm-logo-Photoroom.png'
import solar from '../../content/image-panes/projects/solar-shield-removebg-preview.png'
import parallax from '../../content/image-panes/projects/parallax-removebg-preview.png'

export type GalleryPane = {
  slug: string
  image: StaticImageData
  label: string
  figures?: { image: StaticImageData; alt: string }[]
}

export const workPanes: GalleryPane[] = [
  { slug: 'entegris', image: entg, label: 'Entegris Systems Engineer' },
  { slug: 'caliber-boards', image: caliber, label: 'Caliber Boards ML Engineer' },
  { slug: 'cusm', image: cusm, label: 'CUSM Data Analyst' },
]

export const projectPanes: GalleryPane[] = [
  { slug: 'solar-shield', image: solar, label: 'Solar Shield' },
  { slug: 'parallax-ai', image: parallax, label: 'Parallax AI' },
]
