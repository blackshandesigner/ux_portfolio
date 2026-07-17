import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className={`project-row accent-${project.accent}`}>
      <Link className="project-card-link" href={`/work/${project.slug}`} aria-label={`Open case study: ${project.title}`}>
        <div className="project-number" aria-hidden="true">{project.number}</div>
        <div className="project-copy">
          <div className="project-primary">
            <p className="project-category">{project.category.join(" · ")}</p>
            <h3>{project.title}</h3>
          </div>
          <div className="project-details">
            <div><span>Challenge</span><p>{project.challenge}</p></div>
            <div><span>Approach</span><p>{project.approach}</p></div>
            <div><span>{project.status ? "Status" : "Outcome"}</span><p>{project.status ?? project.outcome}</p></div>
          </div>
        </div>
        <div className="project-image-placeholder" role="img" aria-label={`Placeholder for a product screenshot from ${project.title}`}>
          <span>Product screenshot</span>
          <small>Add image</small>
        </div>
      </Link>
    </article>
  );
}
