/* oxlint-disable react/only-export-components -- Next.js route exports. */
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CircleCursor } from '@/components/circle-cursor'
import { ProjectVideo } from '@/components/project-video'
import { ThermalText } from '@/components/thermal-text'
import { researchFigures } from '@/data/research'
import { resumeDetails } from '@/data/site'

type Props = { params: Promise<{ category: string; slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return resumeDetails.map(({ category, slug }) => ({ category, slug }))
}

export default async function DetailPage({ params }: Props) {
  const { category, slug } = await params
  const entry = resumeDetails.find(item => item.category === category && item.slug === slug)
  if (!entry) notFound()
  const figures = entry.category === 'research' ? researchFigures(entry.slug) : []

  return (
    <main className="detail-page page-width">
      <CircleCursor />
      <Link className="thermal-link back-link" href="/"><ThermalText>← Home</ThermalText></Link>
      <article>
        <p className="detail-category">{entry.category === 'experience' ? 'Work' : entry.category === 'projects' ? 'Projects' : 'Research'}</p>
        <h1>{entry.title}</h1>
        <p className="detail-role">{entry.role}</p>
        {(entry.period || entry.location) && <p className="detail-period">{[entry.period, entry.location].filter(Boolean).join(' · ')}</p>}
        {entry.video && <ProjectVideo id={entry.video.id} title={entry.video.title} />}
        <ul className="detail-points">
          {entry.points.map(point => <li key={point}>{point}</li>)}
        </ul>
        {figures.length > 0 && <div className="research-figures">
          {figures.map(figure => <Image key={figure.alt} src={figure.image} alt={figure.alt} sizes="(max-width: 760px) 90vw, 40rem" />)}
        </div>}
      </article>
    </main>
  )
}
