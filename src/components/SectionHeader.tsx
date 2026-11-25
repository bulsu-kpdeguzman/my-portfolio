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
  const headingClass =
    level === "h1"
      ? "text-3xl font-semibold tracking-tight text-text sm:text-4xl"
      : "text-2xl font-semibold tracking-tight text-text";

  return (
    <div className="mb-10">
      <p className="mb-2 font-mono text-sm text-accent" aria-hidden="true">
        ~/portfolio{path}
      </p>
      <Heading className={headingClass}>{title}</Heading>
      {description ? (
        <p className="mt-2 max-w-xl text-muted">{description}</p>
      ) : null}
    </div>
  );
}
