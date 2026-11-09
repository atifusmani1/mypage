import Image from 'next/image'
import SiteHeader from '@/components/SiteHeader'
import { welcome } from '@/data/site'

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <section className="hero page-width" id="home" aria-labelledby="hero-title">
          <div className="hero-portrait" aria-hidden="true">
            <Image
              src="/images/atif-ascii.png"
              alt=""
              width={1400}
              height={1400}
              sizes="(max-width: 700px) 100vw, 65vw"
              preload
              className="ascii-portrait"
            />
          </div>
          <div className="hero-copy">
            <h1 id="hero-title"><span>Always building.</span><span>Always Learning.</span></h1>
            <p className="welcome-copy">{welcome}</p>
            <span className="draft-note">Welcome message · placeholder</span>
          </div>
          <a className="hero-next text-link" href="#about">A little about me</a>
        </section>

        <section className="content-section page-width" id="about" aria-labelledby="about-title">
          <div className="section-layout">
            <h2 id="about-title">About</h2>
            <div className="section-copy">
              <h3>A work in progress.<br />In the best way.</h3>
              <p>This is where I’ll share a little about my background, my path into coding and AI/ML, and the questions that keep me curious.</p>
              <p className="placeholder-note">Placeholder biography. Personal details coming soon.</p>
            </div>
          </div>
        </section>

        <section className="content-section page-width" id="projects" aria-labelledby="projects-title">
          <div className="section-layout">
            <h2 id="projects-title">Projects</h2>
            <div className="section-copy">
              <h3>Ideas, taking shape.</h3>
              <p>A space for the things I’m making. Selected projects, experiments, and the lessons along the way will live here.</p>
              <div className="project-placeholder">
                <h4>Selected work</h4>
                <span>Coming soon</span>
              </div>
              <p className="placeholder-note">Placeholder. Project details and links haven’t been added yet.</p>
            </div>
          </div>
        </section>

        <section className="content-section page-width" id="beyond" aria-labelledby="beyond-title">
          <div className="section-layout">
            <h2 id="beyond-title">Beyond the screen</h2>
            <div className="section-copy">
              <h3>There’s more<br />to the story.</h3>
              <p>Not everything happens at a keyboard. This is a place for my interests outside coding and AI/ML, the things I enjoy, and everyday discoveries.</p>
              <p className="placeholder-note">Placeholder. A more personal introduction is on its way.</p>
            </div>
          </div>
        </section>

        <section className="content-section contact-section page-width" id="contact" aria-labelledby="contact-title">
          <div className="section-layout">
            <h2 id="contact-title">Contact</h2>
            <div className="section-copy">
              <h3>Good things start<br />with a conversation.</h3>
              <p>Contact details will be added here. Whether it’s an idea, a question, or just a hello, this will be the place to reach me.</p>
              <p className="placeholder-note">Placeholder. Email and social links coming soon.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <span translate="no">Atif Usmani</span>
        <a className="text-link" href="#home">Back to top</a>
      </footer>
    </>
  )
}
