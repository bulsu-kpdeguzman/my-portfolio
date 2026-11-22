import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import SectionHeader from "@/components/SectionHeader";
import TerminalWindow from "@/components/TerminalWindow";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  description: site.description,
  path: "/",
  keywords: [
    "full-stack developer portfolio",
    "web and mobile application developer",
    "Pampanga software developer",
  ],
});

const stats = [
  { label: "projects listed", value: "6", href: "/work" },
  { label: "competition placements", value: "3", href: "/credentials" },
  { label: "professional certificates", value: "2", href: "/credentials" },
  {
    label: "capstone — BJMP Region III",
    value: "1",
    href: "/work/easecert",
  },
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
          I build systems around how people actually work.
        </p>
        <p className="mt-3 max-w-xl text-muted">
          I focus on backend architecture, business logic, and efficient user
          flows — building across the stack to turn real problems into
          practical systems.
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
          30 Finalist
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-md border border-line bg-surface px-4 py-3 transition-colors hover:border-accent"
          >
            <p className="font-mono text-xl text-accent">{s.value}</p>
            <p className="mt-1 text-xs text-faint transition-colors group-hover:text-accent">
              {s.label}
            </p>
          </Link>
        ))}
      </section>

      <section className="py-16">
        <SectionHeader
          path="/projects"
          title="Featured software projects"
          level="h2"
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
          title="About Kenjie P. De Guzman"
          level="h2"
          description="Student developer with a systems mindset — how things should work, how users move through them, and why."
        />
        <TerminalWindow title={`${site.handle}@portfolio: ~/profile`}>
          <div className="space-y-2 font-mono text-sm">
            <p>
              <span className="text-accent">$</span> cat about.txt
            </p>
            <div className="whitespace-pre-line text-muted leading-relaxed">
              {`I'm a BSIT student and full-stack developer who enjoys
turning real-world problems into practical systems.

I naturally gravitate toward the backend — designing
business logic, database structures, APIs, and workflows
that keep a system efficient and consistent.

I also work across the frontend when needed, whether
building an interface from scratch or translating an
existing design into a functional product.

I care about more than just making things work. I think
through the entire flow, question unnecessary complexity,
and look for solutions that make sense for both the
business and the people using the system.`}
            </div>
            <p className="pt-2">
              <span className="text-accent">$</span> ls ./values
            </p>
            <p className="text-muted">
              business-logic-first · backend-minded · user-flow-aware
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
          <Link
            href="/contact"
            className="font-mono text-sm text-accent hover:underline"
          >
            contact me →
          </Link>
        </div>
      </section>
    </div>
  );
}
