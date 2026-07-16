"use client";

import { tools } from "@/data/site";

export function ToolkitMarquee() {
  const repeated = [...tools, ...tools];
  return (
    <div className="marquee" aria-label={`Toolkit: ${tools.join(", ")}`}>
      <div className="marquee-track" aria-hidden="true">
        {repeated.map((tool, index) => (
          <span key={`${tool}-${index}`}>{tool}<i>✳</i></span>
        ))}
      </div>
    </div>
  );
}
