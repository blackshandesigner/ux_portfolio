import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon, ImageIcon } from "lucide-react";
import type { Project } from "@/data/projects";

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <>
      <header className="case-toolbar">
        <Link
          className="case-back-link"
          href="/#work"
          aria-label="Back to Selected Work"
        >
          <ArrowLeftIcon aria-hidden="true" />
          <span>Back to Selected Work</span>
        </Link>
        <p aria-label={`Case study ${project.number}`}>Case study {project.number}</p>
      </header>
      <section
        className={`case-hero accent-${project.accent}`}
        aria-labelledby="case-study-title"
      >
      <div className="case-hero-split">
        <div className="case-title-panel">
          <p>{project.category.join(" · ")}</p>
          <h1 id="case-study-title">{project.title}</h1>
          <span>{project.shortTitle}</span>
        </div>
        <CaseImagePlaceholder
          className="case-cover"
          label="Hero product image"
          hint="Recommended: 1600 × 1200 px"
        />
      </div>
      <div className="case-facts">
        <div><span>Overview</span><p>{project.challenge}</p></div>
        <div><span>Role</span><p>{project.role}</p></div>
        <div><span>Timeline</span><p>{project.timeline}</p></div>
        <div><span>Team</span><p>{project.team}</p></div>
      </div>
      </section>
    </>
  );
}

export function CaseImagePlaceholder({
  label,
  hint,
  className = "",
}: {
  label: string;
  hint: string;
  className?: string;
}) {
  return (
    <figure
      className={`case-image-placeholder ${className}`.trim()}
      role="img"
      aria-label={`${label} placeholder. ${hint}`}
    >
      <ImageIcon aria-hidden="true" />
      <figcaption>
        <strong>{label}</strong>
        <span>Drop your image here · {hint}</span>
      </figcaption>
    </figure>
  );
}

export function CaseStudyContentSection({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="case-content-section">
      <div className="case-section-label"><span>{index}</span><h2>{title}</h2></div>
      <div className="case-section-body">{children}</div>
    </section>
  );
}

export function NextProjectNavigation({ next }: { next: Project }) {
  return (
    <nav className="next-project" aria-label="Next project">
      <p>Next case · {next.number}</p>
      <Link href={`/work/${next.slug}`}>
        <span>{next.shortTitle}</span><ArrowUpRightIcon aria-hidden="true" />
      </Link>
    </nav>
  );
}
