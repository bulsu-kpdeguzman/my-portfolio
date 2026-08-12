import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import SectionHeader from "@/components/SectionHeader";
import TerminalWindow from "@/components/TerminalWindow";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const stats = [
  { label: "projects shipped", value: "6" },
  { label: "avg uptime (SLA)", value: "99.9%" },
  { label: "best p95 latency win", value: "-62%" },
  { label: "events handled / day", value: "40M" },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-3xl px-5">
      <section className="pb-16 pt-20 sm:pt-28">
        <p className="mb-4 font-mono text-sm text-accent">$ whoami</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {site.name}
          <span className="ml-2 inline-block h-[0.9em] w-[0.5ch] translate-y-1 bg-accent cursor-blink" />
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {site.role}
        </p>
        <p className="mt-3 max-w-xl text-muted">
          I design the backend like I design the product — every API, schema
          and rule traces back to a business decision you can measure.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/work"
            className="rounded bg-accent px-5 py-2.5 font-mono text-sm text-white transition-opacity hover:opacity-90"
          >
            view my work ↗
          </Link>
          <Link
            href="/contact"
            className="rounded border border-line px-5 py-2.5 font-mono text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            contact me
          </Link>
        </div>
        <div className="mt-6 font-mono text-xs text-faint">
          <span className="text-ok">●</span> available for work & freelance
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-line bg-surface px-4 py-3"
          >
            <p className="font-mono text-xl text-accent">{s.value}</p>
            <p className="mt-1 text-xs text-faint">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="py-16">
        <SectionHeader
          path="/projects"
          description="A few projects I've designed, built and shipped. Each one started as a business problem."
        />
        <div className="border-t border-line">
          {featured.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/work"
            className="font-mono text-sm text-accent hover:underline"
          >
            view all projects →
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <SectionHeader
          path="/about"
          description="Strong on business logic, backend systems, and — the thing teams notice — how the product should flow."
        />
        <TerminalWindow title="kenji@portfolio: ~/profile">
          <div className="space-y-2 font-mono text-sm">
            <p>
              <span className="text-accent">$</span> cat about.txt
            </p>
            <p className="text-muted">
              Backend engineer with a product brain. I&apos;m at my best when
              the requirements are business output, not tickets — I turn them
              into systems people actually like using.
            </p>
            <p className="text-muted">
              Comfortable across APIs, data, infrastructure and the UX
              judgment that keeps a product coherent.
            </p>
            <p className="pt-2">
              <span className="text-accent">$</span> ls ./values
            </p>
            <p className="text-muted">
              business-outcome-first · measurable · simple-by-construction
            </p>
            <p className="pt-2">
              <span className="text-accent">$</span> _
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent cursor-blink" />
            </p>
          </div>
        </TerminalWindow>
        <div className="mt-6">
          <Link
            href="/about"
            className="font-mono text-sm text-accent hover:underline"
          >
            more about me →
          </Link>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <h2 className="font-mono text-lg text-text">
          $ echo &quot;let&apos;s build something&quot;
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Open to full-time roles, freelance backend work, and product
          consulting. If you have a business problem, I should hear about it.
        </p>
        <div className="mt-6">
          <a
            href={`mailto:${site.email}`}
            className="rounded bg-accent px-5 py-2.5 font-mono text-sm text-white transition-opacity hover:opacity-90"
          >
            {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
