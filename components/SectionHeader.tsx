export function SectionHeader({ title, meta, light = false, compact = false }: { title: string; meta?: string; light?: boolean; compact?: boolean }) {
  return (
    <div className={`section-heading-row ${light ? "is-light" : ""} ${compact ? "is-compact" : ""}`}>
      <h2>{title}</h2>
      {meta ? <p>{meta}</p> : null}
    </div>
  );
}
