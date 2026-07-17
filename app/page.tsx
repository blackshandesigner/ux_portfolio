import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectRow } from "@/components/ProjectRow";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import { experiences, methods, metrics, processSteps } from "@/data/site";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section id="home" className="hero page-container" aria-labelledby="hero-title">
          <div className="hero-intro">
            <p>Turn research, data, and complex workflows into accessible, user-friendly B2B SaaS and AI experiences, from early discovery through launch.</p>
          </div>
          <h1 id="hero-title" className="hero-title">
            <span className="mask"><span>Product</span></span>
            <span className="mask"><span>Designer</span></span>
            <span className="mask hero-title-accent"><span><em>B2B SaaS & AI Experience.</em></span></span>
          </h1>
          <div className="hero-meta">
            <span>Portfolio 2026</span>
          </div>
        </section>

        <section id="work" className="work-section page-container">
          <Reveal><SectionHeader title="Selected Work" compact /></Reveal>
          <div className="project-list">
            {projects.slice(0, 3).map((project) => <ProjectRow project={project} key={project.slug} />)}
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="page-container">
            <Reveal><SectionHeader title="About" compact /></Reveal>
            <Reveal className="about-grid">
              <div>
                <h2>Hybrid<br />Researcher<br /><em>& Designer</em></h2>
              </div>
              <div className="about-copy">
                <p className="lead">I turn complex human behavior into useful, inclusive product experiences—and help teams make clearer decisions along the way.</p>
                <div className="about-columns">
                  <div>
                    <p>I combine qualitative research, behavioral data, product strategy, and interaction design. That hybrid perspective helps me move between the messiness of discovery and the precision of delivery.</p>
                    <p>I care about quiet details: language that reduces hesitation, flows that respect attention, and systems that remain coherent as products grow.</p>
                  </div>
                  <ul>
                    <li>Mobile and responsive web products</li>
                    <li>Fast-moving product environments</li>
                    <li>Close product and engineering partnership</li>
                    <li>Evidence translated into product decisions</li>
                  </ul>
                </div>
              </div>
            </Reveal>

            <div className="metrics-grid" aria-label="Career metrics">
              {metrics.map((metric) => (
                <Reveal className={`metric metric-${metric.tone}`} key={metric.label}>
                  <strong>{metric.value}</strong><span>{metric.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section page-container" aria-label="Experience timeline">
          <Reveal><SectionHeader title="Experience" compact /></Reveal>
          <div className="timeline">
            {experiences.map((experience) => (
              <Reveal className="experience-row" key={`${experience.title}-${experience.start}`}>
                <div className="experience-date">
                  <span>{experience.start}</span><span>{experience.end}</span><small>{experience.duration}</small>
                </div>
                <div className="timeline-marker" aria-hidden="true"><span /></div>
                <div className="experience-role"><h3>{experience.title}</h3><p>{experience.company}</p></div>
                <div className="experience-detail"><p>{experience.description}</p><ul>{experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul></div>
              </Reveal>
            ))}
          </div>

          <Reveal className="credentials-grid">
            <div>
              <p className="eyebrow">Education</p>
              <div className="credential-row"><h3>Master of Human-Computer Interaction</h3><p>University of Design & Technology</p><span>2020</span></div>
              <div className="credential-row"><h3>BA, Visual Communication</h3><p>National Arts University</p><span>2017</span></div>
            </div>
            <div>
              <p className="eyebrow">Certifications</p>
              <div className="credential-row"><h3>Inclusive Design for Digital Products</h3><p>Interaction Design Foundation</p><span>2025</span></div>
              <div className="credential-row"><h3>Product Analytics</h3><p>Reforge</p><span>2023</span></div>
            </div>
          </Reveal>
        </section>

        <section id="process" className="process-section">
          <div className="page-container">
            <Reveal><SectionHeader title="Process" compact /></Reveal>
            <div className="process-list">
              {processSteps.map(([number, title, description]) => (
                <Reveal className="process-row" key={number}>
                  <span>{number}</span><h3>{title}</h3><p>{description}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="methods-section">
              <div className="methods-intro"><p className="eyebrow">Research methods</p><h2>Right-sized to the decision, never the ritual.</h2></div>
              <div className="methods-groups">
                {Object.entries(methods).map(([group, items]) => (
                  <div className="method-group" key={group}>
                    <h3>{group}</h3>
                    <div>{items.map((item) => <span className="method-tag" key={item}>{item}</span>)}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-container">
            <Reveal>
              <SectionHeader title="Contact" compact />
              <h2 className="contact-title">Let’s<br /><em>Talk</em></h2>
              <div className="contact-bottom">
                <p>Open to product design opportunities, research collaborations, and thoughtful conversations about digital products.</p>
                <div className="contact-links">
                  <a className="email-link" href="mailto:hello@yourportfolio.com">hello@yourportfolio.com ↗</a>
                  <div>
                    <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn <span>↗</span></a>
                    <a className="resume-link" href="/resume-placeholder.txt" download>Download résumé ↓</a>
                    <span>Taipei, Taiwan · GMT+8</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
