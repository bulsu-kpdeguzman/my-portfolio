export default function SectionHeader({
  path,
  title,
  description,
  level = "h1",
}: {
  path: string;
  title: string;
  description?: string;
  level?: "h1" | "h2";
}) {
  const Heading = level;

  return (
    <div className="mb-10">
      <Heading className="mb-2 font-mono text-sm text-accent">
        <span className="sr-only">{title} — </span>
        <span aria-hidden="true">~/portfolio{path}</span>
      </Heading>
      {description ? (
        <p className="max-w-xl text-muted">{description}</p>
      ) : null}
    </div>
  );
}
