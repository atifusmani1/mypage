/* oxlint-disable react/only-export-components -- Next.js route exports. */
import type { Metadata } from 'next'
import { PaneGallery } from '@/components/pane-gallery'
import { resumeDetails } from '@/data/site'

export const metadata: Metadata = { title: 'Work — Atif Usmani' }

export default function WorkPage() {
  return <PaneGallery category="experience" entries={resumeDetails.filter(entry => entry.category === 'experience')} />
}
