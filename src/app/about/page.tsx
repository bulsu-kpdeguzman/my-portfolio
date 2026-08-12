import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import TerminalWindow from "@/components/TerminalWindow";

export const metadata: Metadata = {
  title: "About",
};

const skills = [
  "Go",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "ClickHouse",
  "Docker",
  "gRPC",
  "REST",
  "OAuth2 / OIDC",
  "AWS",
  "GCP",
  "event-driven",
];

const values = [
  "Business outcome first — I ask 'what should this move for the business' before touching code.",
  "Measure everything — every project ships with numbers attached.",
  "Simple by construction — prefer boring, reliable systems that are easy to reason about.",
  "UX flow matters to me — I ship backends, but I review the product like a user.",
];

const timeline = [
  {
    period: "2024 — now",
    title: "Senior Backend Engineer",
    org: "Laterra",
    text: "Lead the platform's event pipeline and pricing engine. Introduced the rules-as-config pattern now used across 4 products.",
  },
  {
    period: "2022 — 2024",
    title: "Backend Engineer",
    org: "Northstack",
    text: "Shipped identity, notification and analytics services. Cut month-end report latency by 62%.",
  },
  {
    period: "2020 — 2022",
    title: "Full-Stack Developer",
    org: "Slice Collective",
    text: "Full-stack on client work — taught me product thinking by being closer to the user and the design.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/about"
        description="The long version — who I am, what I value, and how I got here."
      />

      <TerminalWindow title="kenji@portfolio: ~/about">
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            <span className="text-accent">$</span> I&apos;m{" "}
            <span className="text-text">Kenji</span> — a backend engineer, but
            honestly the label undersells it. I&apos;m strong on business
            logic: turning a messy requirement like &quot;make signup stop
            leaking money&quot; into a clear architecture, a few crisp APIs, and
            the right data model.
          </p>
          <p>
            The slightly unusual part: I also judge UX and product flow well.
            I&apos;m usually the one in the room saying &quot;wait — the user
            will never figure that out from here.&quot; That combination means
            I don&apos;t just build the backend to spec; I build the spec into
            something a customer would actually tolerate.
          </p>
          <p>
            Not a professional graphic designer — that&apos;s why this site
            looks like a terminal. Judgment over decoration.
          </p>
        </div>
      </TerminalWindow>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="mb-4 font-mono text-sm text-accent">
            $ cat tools.conf
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded bg-surface px-2.5 py-1 font-mono text-xs text-muted ring-1 ring-inset ring-line"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 font-mono text-sm text-accent">
            $ cat values.txt
          </h2>
          <ul className="space-y-3">
            {values.map((v, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted">
                <span className="font-mono text-ok">✓</span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="mb-6 font-mono text-sm text-accent">
          $ ls ~/experience
        </h2>
        <div className="border-l border-line pl-6">
          {timeline.map((item) => (
            <div key={item.title} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="font-mono text-xs text-faint">{item.period}</p>
              <h3 className="mt-1 font-mono text-text">
                {item.title} <span className="text-muted">— {item.org}</span>
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
