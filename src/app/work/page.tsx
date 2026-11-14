import { PaneGallery } from '@/components/pane-gallery'
import { resumeDetails } from '@/data/site'

export default function WorkPage() {
  return <PaneGallery category="experience" entries={resumeDetails.filter(entry => entry.category === 'experience')} />
}
