import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseStudyContentSection, CaseStudyHero, NextProjectNavigation } from "@/components/CaseStudy";
import { Reveal } from "@/components/Reveal";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.challenge,
    openGraph: { images: [{ url: project.previewImage }] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Header />
      <main id="main-content" className="case-page page-container">
        <CaseStudyHero project={project} />
        <div className="case-narrative">
          <Reveal><CaseStudyContentSection index="01" title="Context"><p className="case-lead">{project.context}</p></CaseStudyContentSection></Reveal>
          <Reveal><CaseStudyContentSection index="02" title="Problem"><p className="case-lead">{project.problem}</p><blockquote>How might we make the next decision clearer without hiding uncertainty?</blockquote></CaseStudyContentSection></Reveal>
          <Reveal>
            <CaseStudyContentSection index="03" title="Research">
              <p>We built the research plan around the product decision—not around a preferred method. The work moved between observed behavior, direct conversation, and prototype evidence.</p>
              <div className="case-method-grid">{project.research.map((method, i) => <div key={method}><span>0{i + 1}</span><p>{method}</p></div>)}</div>
            </CaseStudyContentSection>
          </Reveal>
          <Reveal>
            <CaseStudyContentSection index="04" title="Key insights">
              <div className="case-insight-list">{project.insights.map((insight, i) => <article key={insight.title}><span>0{i + 1}</span><h3>{insight.title}</h3><p>{insight.detail}</p></article>)}</div>
            </CaseStudyContentSection>
          </Reveal>
          <Reveal>
            <CaseStudyContentSection index="05" title="Design decisions">
              <div className="decision-grid">{project.decisions.map((decision, i) => <article key={decision.title}><span>{project.number}.{i + 1}</span><h3>{decision.title}</h3><p>{decision.detail}</p></article>)}</div>
            </CaseStudyContentSection>
          </Reveal>
          <Reveal>
            <CaseStudyContentSection index="06" title="Flow & wireframes">
              <div className="flow-diagram" role="img" aria-label="Simplified user flow from intent through guided choice to a useful outcome">
                <div><span>01</span><strong>Intent</strong><small>Start with the user&apos;s goal</small></div><i>→</i>
                <div><span>02</span><strong>Guided choice</strong><small>Explain the next commitment</small></div><i>→</i>
                <div><span>03</span><strong>Useful outcome</strong><small>Make value immediately visible</small></div>
              </div>
            </CaseStudyContentSection>
          </Reveal>
          <Reveal>
            <CaseStudyContentSection index="07" title="Final solution">
              <div className={`solution-frame accent-${project.accent}`}><Image src={project.previewImage} alt={`Final interface for ${project.title}`} width={396} height={793} sizes="(max-width: 680px) 78vw, 380px" /></div>
              <p>The final experience uses progressive disclosure, plain language, and a stable visual hierarchy. Secondary complexity remains available without competing with the next useful action.</p>
            </CaseStudyContentSection>
          </Reveal>
          <Reveal>
            <CaseStudyContentSection index="08" title="Outcomes">
              <div className="outcome-list">{project.outcomes.map((outcome, i) => <div key={outcome}><span>0{i + 1}</span><strong>{outcome}</strong></div>)}</div>
            </CaseStudyContentSection>
          </Reveal>
          <Reveal><CaseStudyContentSection index="09" title="What I learned"><p className="case-lead">{project.learning}</p></CaseStudyContentSection></Reveal>
          <NextProjectNavigation next={next} />
        </div>
      </main>
      <Footer />
    </>
  );
}
