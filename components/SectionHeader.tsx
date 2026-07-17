export function SectionHeader({ title, meta, light = false }: { title: string; meta?: string; light?: boolean }) {
  return (
    <div className={`section-heading-row ${light ? "is-light" : ""}`}>
      <h2>{title}</h2>
      {meta ? <p>{meta}</p> : null}
    </div>
  );
}
