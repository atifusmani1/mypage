/* oxlint-disable react/only-export-components -- Next.js route exports. */
import type { Metadata } from 'next'
import { PaneGallery } from '@/components/pane-gallery'
import { resumeDetails } from '@/data/site'

export const metadata: Metadata = { title: 'Projects — Atif Usmani' }

export default function ProjectsPage() {
  return <PaneGallery category="projects" entries={resumeDetails.filter(entry => entry.category === 'projects')} />
}
