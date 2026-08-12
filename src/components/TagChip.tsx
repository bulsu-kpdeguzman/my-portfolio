export default function TagChip({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded px-1.5 py-0.5 font-mono text-xs text-muted ring-1 ring-inset ring-line">
      #{tag}
    </span>
  );
}
