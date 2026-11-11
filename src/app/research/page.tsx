/* oxlint-disable react/only-export-components -- Next.js route exports. */
import type { Metadata } from 'next'
import { PaneGallery } from '@/components/pane-gallery'
import { researchPanes } from '@/data/research'
import { resumeDetails } from '@/data/site'

export const metadata: Metadata = { title: 'Research — Atif Usmani' }

export default function ResearchPage() {
  return <PaneGallery category="research" panes={researchPanes} entries={resumeDetails.filter(entry => entry.category === 'research')} />
}
