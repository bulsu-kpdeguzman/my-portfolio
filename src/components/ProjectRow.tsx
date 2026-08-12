import Link from "next/link";
import type { Project } from "@/data/projects";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex items-start justify-between gap-4 border-b border-line py-4 transition-colors hover:bg-surface sm:px-2"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-base font-medium text-text transition-colors group-hover:text-accent">
            {project.name}
          </span>
          <span className="font-mono text-xs text-faint">
            #{project.category}
          </span>
        </div>
        <p className="mt-1 max-w-xl text-sm text-muted">{project.tagline}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3 pt-1">
        <span className="font-mono text-xs text-faint">{project.year}</span>
        <span className="font-mono text-muted transition-colors group-hover:text-accent">
          ↗
        </span>
      </div>
    </Link>
  );
}
