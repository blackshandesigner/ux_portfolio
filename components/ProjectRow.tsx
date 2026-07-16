"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";

export function ProjectRow({ project }: { project: Project }) {
  const rowRef = useRef<HTMLElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <article
      ref={rowRef}
      className={`project-row accent-${project.accent}`}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const bounds = rowRef.current?.getBoundingClientRect();
        if (!bounds) return;
        setPointer({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
      }}
    >
      <div className="project-number" aria-hidden="true">{project.number}</div>
      <div className="project-primary">
        <p className="project-category">{project.category.join(" · ")}</p>
        <h3>{project.title}</h3>
        <div className="project-mobile-image">
          <Image src={project.previewImage} alt={`Interface preview for ${project.title}`} width={396} height={793} sizes="(max-width: 680px) 92vw, 36vw" />
        </div>
      </div>
      <div className="project-details">
        <div><span>Challenge</span><p>{project.challenge}</p></div>
        <div><span>Approach</span><p>{project.approach}</p></div>
        <div><span>{project.status ? "Status" : "Outcome"}</span><p>{project.status ?? project.outcome}</p></div>
      </div>
      <Link className="project-link" href={`/work/${project.slug}`} aria-label={`Open case study: ${project.title}`}>
        <span>Open case</span><span className="arrow" aria-hidden="true">↗</span>
      </Link>
      <div className="project-preview" style={{ left: pointer.x, top: pointer.y }} aria-hidden="true">
        <Image src={project.previewImage} alt="" fill sizes="280px" />
      </div>
    </article>
  );
}
