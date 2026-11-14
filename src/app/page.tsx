import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import Link from 'next/link'
import { Portrait } from '@/components/portrait'
import { Opening } from '@/components/opening'
import { CircleCursor } from '@/components/circle-cursor'
import { resumeSections } from '@/data/site'
import { ThermalText } from '@/components/thermal-text'
import { ResumePopup } from '@/components/resume-popup'

export default function Home() {
  const about = readFileSync(join(process.cwd(), 'content/about.md'), 'utf8')
    .trim().replace(/\s+/g, ' ')

  return (
    <main className="opening" id="main">
      <CircleCursor />
      <Opening
        summary={<>
          <p>{about}</p>
          <div className="contact-links" role="group" aria-label="Contact links">
            <a className="thermal-link" href="mailto:atifaliusmani@gmail.com"><ThermalText>Email</ThermalText></a>
            <a className="thermal-link" href="https://github.com/atifusmani1"><ThermalText>GitHub</ThermalText></a>
            <a className="thermal-link" href="https://www.linkedin.com/in/atifusmani"><ThermalText>LinkedIn</ThermalText></a>
            <ResumePopup />
          </div>
        </>}
        portrait={<Portrait />}
      >
        <div className="details-shell">
          <div className="details">
            {resumeSections.map(section => (
              <section className="detail" key={section.title} aria-labelledby={`${section.title.toLowerCase()}-title`}>
                <h2 id={`${section.title.toLowerCase()}-title`}>{section.title}</h2>
                <ul className="detail-copy">
                  {section.entries.map(entry => {
                    const cells = (
                      <>
                        <ThermalText>{entry.name}</ThermalText>
                        <span className="sr-only">, </span>
                        <ThermalText>{entry.role}</ThermalText>
                        <span className="sr-only">, </span>
                        <ThermalText>{entry.summary}</ThermalText>
                      </>
                    )

                    return (
                      <li key={entry.name}>
                        {entry.href ? (
                          entry.external ? (
                            <a className="resume-row thermal-link" href={entry.href}>{cells}</a>
                          ) : (
                            <Link className="resume-row thermal-link" href={entry.href}>{cells}</Link>
                          )
                        ) : (
                          <div className="resume-row">
                            <span>{entry.name}</span>
                            <span className="sr-only">, </span>
                            <span>{entry.role}</span>
                            <span className="sr-only">, </span>
                            <span>{entry.summary}</span>
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
        <Link className="more-life thermal-link" href="/more-life"><ThermalText>Gallery</ThermalText></Link>
      </Opening>
    </main>
  )
}
