import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import TerminalWindow from "@/components/TerminalWindow";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
};

const skills = [
  "React.js",
  "Laravel",
  "PHP",
  "MySQL",
  "JavaScript / TypeScript",
  "Tailwind CSS",
  "REST APIs",
  "Git / GitHub",
];

const values = [
  "Business outcome first — I ask 'what should this move for the business' before touching code.",
  "Measure everything — I try to attach real numbers to every project.",
  "Simple by construction — prefer boring, reliable systems that are easy to reason about.",
  "UX flow matters to me — I build the whole stack, but I review the product like a user.",
];

const timeline = [
  {
    period: "— May 2027 (expected)",
    title: "BS in Information Technology",
    org: "Bulacan State University — Main Campus",
    text: "Studying software development, databases, and systems analysis. Expected to graduate May 2027.",
  },
  {
    period: "2026",
    title: "Capstone Lead — EaseCert",
    org: "BJMP Region III",
    text: "Led and built a full-stack document issuance and appointment management system as capstone leader and primary developer.",
  },
  {
    period: "2026",
    title: "API Integration Lead — eSkolar",
    org: "eGovPH Hackathon",
    text: "Integrated eGovSSO, eMessage, eGovAI and Face Liveness into a unified scholarship platform. Top 30 finalist.",
  },
  {
    period: "2026",
    title: "Marketing Plan Lead — DIWA",
    org: "IT Marketing Challenge",
    text: "Crafted the positioning, strategy and pitch for a smart tourism concept. 4th place.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/about"
        description="The long version — who I am, what I value, and how I got here."
      />

      <TerminalWindow title={`${site.handle}@portfolio: ~/about`}>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            <span className="text-accent">$</span> I&apos;m{" "}
            <span className="text-text">Kenjie</span> — a student developer
            who treats software like a business decision, not just a ticket.
            My capstone for BJMP Region III digitized document issuance and
            appointments; my hackathon build integrated eGovSSO, eMessage,
            eGovAI and Face Liveness into one scholarship platform.
          </p>
          <p>
            The slightly unusual part: I also judge UX and product flow well —
            I&apos;m the one asking &quot;wait, the user will never figure
            that out from here.&quot; That&apos;s the mindset I bring to every
            project.
          </p>
          <p>
            Not a professional designer — that&apos;s why this site looks like
            a terminal. Judgment over decoration.
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
