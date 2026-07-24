import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import {
  CaseImagePlaceholder,
  CaseStudyContentSection,
  CaseStudyHero,
  NextProjectNavigation,
} from "@/components/CaseStudy";
import { Reveal } from "@/components/Reveal";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.slice(0, 3).map((project) => ({ slug: project.slug }));
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
  const selectedProjects = projects.slice(0, 3);
  if (!project || !selectedProjects.some((item) => item.slug === slug)) notFound();
  const index = selectedProjects.findIndex((item) => item.slug === slug);
  const next = selectedProjects[(index + 1) % selectedProjects.length];

  return (
    <>
      <main id="main-content" className="case-page page-container">
        <CaseStudyHero project={project} />
        <div className="case-narrative">
          <Reveal><CaseStudyContentSection index="01" title="Context"><p className="case-lead">{project.context}</p></CaseStudyContentSection></Reveal>
          <Reveal><CaseStudyContentSection index="02" title="Problem"><p className="case-lead">{project.problem}</p><blockquote>How might we make the next decision clearer without hiding uncertainty?</blockquote></CaseStudyContentSection></Reveal>
          <Reveal>
            <CaseStudyContentSection index="03" title="Research">
              <p>We built the research plan around the product decision—not around a preferred method. The work moved between observed behavior, direct conversation, and prototype evidence.</p>
              <div className="case-method-grid">{project.research.map((method, i) => <div key={method}><span>0{i + 1}</span><p>{method}</p></div>)}</div>
              <CaseImagePlaceholder
                className="case-inline-image"
                label="Research and discovery image"
                hint="Recommended: 1600 × 1000 px"
              />
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
            <CaseStudyContentSection index="06" title="Design development">
              <div className="flow-diagram" role="img" aria-label="Simplified user flow from intent through guided choice to a useful outcome">
                <div><span>01</span><strong>Intent</strong><small>Start with the user&apos;s goal</small></div><i>→</i>
                <div><span>02</span><strong>Guided choice</strong><small>Explain the next commitment</small></div><i>→</i>
                <div><span>03</span><strong>Useful outcome</strong><small>Make value immediately visible</small></div>
              </div>
              <div className="case-image-pair">
                <CaseImagePlaceholder label="Early concept" hint="Recommended: 1200 × 900 px" />
                <CaseImagePlaceholder label="Refined wireframe" hint="Recommended: 1200 × 900 px" />
              </div>
            </CaseStudyContentSection>
          </Reveal>
          <Reveal>
            <CaseStudyContentSection index="07" title="Final solution">
              <CaseImagePlaceholder
                className={`solution-frame accent-${project.accent}`}
                label="Final product image"
                hint="Recommended: 2000 × 1400 px"
              />
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
