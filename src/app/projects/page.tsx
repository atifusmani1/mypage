import { PaneGallery } from '@/components/pane-gallery'
import { resumeDetails } from '@/data/site'

export default function ProjectsPage() {
  return <PaneGallery category="projects" entries={resumeDetails.filter(entry => entry.category === 'projects')} />
}
