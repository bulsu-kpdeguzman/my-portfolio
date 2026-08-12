import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TagChip from "@/components/TagChip";
import TerminalWindow from "@/components/TerminalWindow";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.name };
}

function Prompt({ cmd }: { cmd: string }) {
  return (
    <h2 className="mt-10 mb-3 font-mono text-sm text-accent first:mt-0">
      $ {cmd}
    </h2>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <Link
        href="/work"
        className="mb-8 inline-block font-mono text-sm text-muted hover:text-accent"
      >
        ← back to projects
      </Link>

      <TerminalWindow title={`kenji@portfolio: ~/projects/${project.slug}`}>
        <div className="space-y-2 border-b border-line pb-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.name}
          </h1>
          <p className="text-muted">{project.tagline}</p>
          <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-xs text-faint">
            <span>#{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span className={project.status === "shipped" ? "text-ok" : ""}>
              {project.status}
            </span>
            {project.externalUrl ? (
              <>
                <span>·</span>
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  live ↗
                </a>
              </>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
        </div>

        <Prompt cmd="cat README.md" />
        <p className="leading-relaxed text-muted">{project.overview}</p>

        <Prompt cmd="cat PROBLEM.md" />
        <p className="leading-relaxed text-muted">{project.problem}</p>

        <Prompt cmd="whoami" />
        <p className="leading-relaxed text-muted">{project.role}</p>

        <Prompt cmd="cd approach && ls -1" />
        <ul className="mt-4 space-y-3">
          {project.approach.map((step, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>

        {project.architecture ? (
          <>
            <Prompt cmd="cat architecture.txt" />
            <pre className="overflow-x-auto rounded bg-bg p-4 font-mono text-xs leading-relaxed text-ok ring-1 ring-inset ring-line">
              {project.architecture}
            </pre>
          </>
        ) : null}

        <Prompt cmd="tail results.log" />
        <div className="mt-4 grid grid-cols-2 gap-3">
          {project.results.map((r) => (
            <div
              key={r.label}
              className="rounded-md border border-line bg-bg px-4 py-3"
            >
              <p className="font-mono text-lg text-accent">{r.value}</p>
              <p className="mt-1 text-xs text-faint">{r.label}</p>
            </div>
          ))}
        </div>

        {project.retro ? (
          <>
            <Prompt cmd="cat retro.txt" />
            <p className="leading-relaxed text-muted">{project.retro}</p>
          </>
        ) : null}

        <Prompt cmd="cat stack.txt" />
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded bg-surface-hi px-2.5 py-1 font-mono text-xs text-muted ring-1 ring-inset ring-line"
            >
              {s}
            </span>
          ))}
        </div>
      </TerminalWindow>

      <nav className="mt-10 flex items-center justify-between border-t border-line pt-6 font-mono text-sm">
        {prev ? (
          <Link href={`/work/${prev.slug}`} className="text-muted hover:text-accent">
            ← {prev.name}
          </Link>
        ) : (
          <span className="text-faint">← end of history</span>
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} className="text-muted hover:text-accent">
            {next.name} →
          </Link>
        ) : (
          <span className="text-faint">end of history →</span>
        )}
      </nav>
    </div>
  );
}
