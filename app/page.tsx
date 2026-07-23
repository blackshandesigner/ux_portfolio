import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectRow } from "@/components/ProjectRow";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/data/projects";
import { experiences, methods, processSteps } from "@/data/site";
import { ExternalLink, Mail } from "lucide-react";

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
                <h2>Product Designer<br /><em>& System Thinker</em></h2>
              </div>
              <div className="about-copy">
                <div className="about-columns">
                  <div>
                    <p>I’m a Product Designer with experience across B2B SaaS, AI-powered products, and complex digital services. I combine user research, product strategy, interaction design, analytics, and rapid prototyping to move ideas from discovery through launch and continuous improvement.</p>
                    <p>My work includes designing AI-driven features, accessible design systems, design tokens, and operational workflows for international users. I care about making products easier to understand, easier to maintain, and more consistent across design and engineering.</p>
                  </div>
                  <ul>
                    <li>AI-powered B2B products</li>
                    <li>Research-led product decisions</li>
                    <li>Accessible design systems</li>
                    <li>Cross-functional product delivery</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="experience-section page-container" aria-label="Experience timeline">
          <Reveal><SectionHeader title="Experience" compact /></Reveal>
          <div className="timeline">
            {experiences.map((experience) => (
              <Reveal className="experience-row" key={`${experience.title}-${experience.start}`}>
                <div className="experience-date">
                  <span>{experience.start} - {experience.end}</span><small>{experience.duration}</small>
                </div>
                <div className="timeline-marker" aria-hidden="true"><span /></div>
                <div className="experience-role"><h3>{experience.title}</h3><p>{experience.company}</p></div>
                <div className="experience-detail">
                  {experience.description ? <p>{experience.description}</p> : null}
                  <ul>{experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="education-section">
            <SectionHeader title="Education" compact />
            <div className="education-list">
              <div className="experience-row education-row">
                <div className="experience-date"><span>2017 - 2019</span><small>Milan, Italy</small></div>
                <div className="timeline-marker" aria-hidden="true"><span /></div>
                <div className="experience-role"><h3>Master in Business Design</h3><p>Domus Academy</p></div>
              </div>
              <div className="experience-row education-row">
                <div className="experience-date"><span>2011 - 2015</span><small>Kaohsiung, Taiwan</small></div>
                <div className="timeline-marker" aria-hidden="true"><span /></div>
                <div className="experience-role"><h3>BFA in Digital Media Design</h3><p>I-Shou University</p></div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="process" className="process-section">
          <div className="page-container">
            <Reveal>
              <SectionHeader title="How I Work" meta="AI-enhanced 6 steps playbook" compact />
            </Reveal>
            <div className="process-playbook">
              <div className="process-list">
              {processSteps.map(([number, title, description]) => (
                <Reveal className="process-row" key={number}>
                    <span>{number}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </Reveal>
              ))}
              </div>
              <div className="methods-groups">
                {Object.entries(methods).map(([group, items]) => (
                  <Reveal className="method-group" key={group}>
                    <h3>{group}</h3>
                    <div>{items.map((item) => <span className="method-tag" key={item}>{item}</span>)}</div>
                  </Reveal>
                ))}
              </div>
            </div>
            <p className="process-summary">Flexible process spanning product discovery, solution validation, and delivery.</p>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="page-container">
            <Reveal>
              <SectionHeader title="Contact" compact />
              <div className="contact-layout">
                <div className="contact-panel">
                  <p>Open to new opportunities, collaborations, and conversations about product design, research, and AI experiences.</p>
                  <div className="contact-links">
                    <a href="mailto:blackshandesigner@gmail.com">
                      <span className="contact-link-label">
                        <Mail aria-hidden="true" />
                        <span>blackshandesigner@gmail.com</span>
                      </span>
                    </a>
                    <a href="https://www.linkedin.com/in/hui-shan-chen-35b263117/" target="_blank" rel="noopener noreferrer">
                      <span className="contact-link-label">
                        <ExternalLink aria-hidden="true" />
                        <span>LinkedIn</span>
                      </span>
                    </a>
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
