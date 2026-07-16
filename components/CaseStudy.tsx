import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <header className={`case-hero accent-${project.accent}`}>
      <div className="case-kicker">
        <span>{project.number}</span><span>{project.category.join(" · ")}</span>
      </div>
      <h1>{project.title}</h1>
      <div className="case-facts">
        <div><span>Challenge</span><p>{project.challenge}</p></div>
        <div><span>Role</span><p>{project.role}</p></div>
        <div><span>Timeline</span><p>{project.timeline}</p></div>
        <div><span>Team</span><p>{project.team}</p></div>
      </div>
      <figure className="case-cover">
        <Image src={project.previewImage} alt={`Product interface developed for ${project.title}`} fill priority sizes="100vw" />
      </figure>
    </header>
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
        <span>{next.shortTitle}</span><i aria-hidden="true">↗</i>
      </Link>
    </nav>
  );
}
