import { PaneGallery } from '@/components/pane-gallery'
import { researchPanes } from '@/data/research'
import { resumeDetails } from '@/data/site'

export default function ResearchPage() {
  return <PaneGallery category="research" panes={researchPanes} entries={resumeDetails.filter(entry => entry.category === 'research')} />
}
