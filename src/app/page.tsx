import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import SectionHeader from "@/components/SectionHeader";
import TerminalWindow from "@/components/TerminalWindow";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const stats = [
  { label: "projects listed", value: "3" },
  { label: "hackathon wins", value: "2" },
  { label: "Google AI certs", value: "3" },
  { label: "capstone client", value: "BJMP Region III" },
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
        <p className="mt-3 font-mono text-sm text-faint">
          {site.fullName} · {site.tagline}
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {site.role}
        </p>
        <p className="mt-3 max-w-xl text-muted">
          I build full-stack systems that trace back to real problems —
          business logic first, user flow always.
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
          <span className="mx-2">·</span>
          <span className="text-accent">recent:</span> eGovPH Hackathon — Top
          30 Finalist (this month)
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
          description="Capstone, hackathon and competition builds — each one started as a real problem."
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
          description="Student developer with a product brain — how systems should flow, and why."
        />
        <TerminalWindow title={`${site.handle}@portfolio: ~/profile`}>
          <div className="space-y-2 font-mono text-sm">
            <p>
              <span className="text-accent">$</span> cat about.txt
            </p>
            <p className="text-muted">
              Student developer with a product brain. I&apos;ve built for real
              users — capstone clients and hackathon judges — and I design
              systems around what the business actually needs.
            </p>
            <p className="text-muted">
              Comfortable across frontend, backend, databases and API
              integration, plus the product judgment that keeps a system
              coherent.
            </p>
            <p className="pt-2">
              <span className="text-accent">$</span> ls ./values
            </p>
            <p className="text-muted">
              business-first · measurable · user-flow-aware
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
          Open to internships, freelance work, and junior full-stack roles. If
          you have a problem worth building for, I&apos;d like to hear about
          it.
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
