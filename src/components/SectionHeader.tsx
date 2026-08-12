export default function SectionHeader({
  path,
  description,
}: {
  path: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 font-mono text-sm text-accent">~/portfolio{path}</p>
      {description ? (
        <p className="max-w-xl text-muted">{description}</p>
      ) : null}
    </div>
  );
}
