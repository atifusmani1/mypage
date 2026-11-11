import type { StaticImageData } from 'next/image'
import type { GalleryPane } from '@/components/pane-gallery'
import biasLogo from '../../content/image-panes/research/bias-lab/bias-lab-removebg-preview.png'
import sensorimotorDemo from '../../content/image-panes/research/bias-lab/sensorimotor-demo.png'
import cellLogo from '../../content/image-panes/research/cell-universe/cell-universe-removebg-preview.png'
import pcaEven from '../../content/image-panes/research/cell-universe/PCA-even.png'
import pcaLong from '../../content/image-panes/research/cell-universe/PCA-long.png'
import cellView from '../../content/image-panes/research/cell-universe/cu-3d-cell-view.png'

export type ResearchFigure = { image: StaticImageData; alt: string }

export const researchPanes: GalleryPane[] = [
  {
    slug: 'bias-lab',
    image: biasLogo,
    label: 'BIAS Lab',
    figures: [
      {
        image: sensorimotorDemo,
        alt: 'Infant Agent: Sensorimotor Synchrony Exploration — a MiniGrid environment feeding actions, proprioception, vision, and visual change into a synchrony detection loop.',
      },
    ],
  },
  {
    slug: 'cell-universe-lab',
    image: cellLogo,
    label: 'Cell Universe Lab',
    figures: [
      { image: pcaEven, alt: 'PCA plot of a round cell colony with principal axes drawn through its centre.' },
      { image: pcaLong, alt: 'PCA plot of an elongated cell colony with principal axes drawn through its centre.' },
      { image: cellView, alt: '3D plot of cell positions inside a gridded bounding box.' },
    ],
  },
]

export function researchFigures(slug: string) {
  return researchPanes.find(pane => pane.slug === slug)?.figures ?? []
}
