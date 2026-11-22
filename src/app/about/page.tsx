import SectionHeader from "@/components/SectionHeader";
import TerminalWindow from "@/components/TerminalWindow";
import { site } from "@/data/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Kenjie P. De Guzman, a Dean's List BSIT student at Bulacan State University and full-stack developer focused on backend systems, AI, and product workflows.",
  path: "/about",
  keywords: ["BSIT student", "Dean's List", "Bulacan State University"],
});

const skills = [
  "Laravel",
  "PHP",
  "MySQL",
  "PostgreSQL",
  "REST APIs",
  "React.js",
  "Next.js",
  "JavaScript / TypeScript",
  "Python",
  "Java",
  "C#",
  "Tailwind CSS",
  "Docker",
  "Git / GitHub",
];

const values = [
  {
    title: "Business-first",
    text: "Understand the problem before building the solution.",
  },
  {
    title: "Systems-minded",
    text: "Design the logic, structure, and flow before adding complexity.",
  },
  {
    title: "User-flow-aware",
    text: "Build the whole stack, but evaluate the product from the user's perspective.",
  },
  {
    title: "Practical by design",
    text: "Prefer simple, reliable solutions over unnecessary complexity.",
  },
];

const timeline = [
  {
    period: "— May 2027 (expected)",
    title: "BS in Information Technology — Web & Mobile Development",
    org: "Bulacan State University — Main Campus",
    text: "Dean's List from 2023–2025 and nominee for Best Capstone. Studying software development, databases, systems analysis, and web and mobile application development.",
  },
  {
    period: "2023 — present",
    title: "Creative Writers Team Lead",
    org: "BulSU CICT Local Student Council",
    text: "Leads creative-writing work for the college's local student council alongside technical studies and project development.",
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
        title="About Kenjie P. De Guzman"
        description="The long version — who I am, what I value, and how I got here."
      />

      <TerminalWindow title={`${site.handle}@portfolio: ~/about`}>
        <div className="space-y-4 text-muted leading-relaxed">
          <p className="font-mono text-xs text-faint">
            <span className="text-accent">$</span> cat about.txt
          </p>
          <p>
            I&apos;m <span className="text-text">{site.fullName}</span> — a BSIT
            student and full-stack developer who treats software as a system,
            not just a collection of features.
          </p>
          <p>
            I naturally gravitate toward the backend: business logic, database
            design, APIs, and workflows. I like figuring out how things
            should work before figuring out how to code them.
          </p>
          <p>
            I&apos;m comfortable across the stack, but my strongest
            contribution is often in the thinking behind the system —
            simplifying processes, connecting the pieces, and making sure the
            user flow actually makes sense.
          </p>
          <p>
            I also have a strong eye for UX and product flow. I may not be the
            person designing every visual from scratch, but I&apos;m usually
            the person asking: &quot;Does this make sense to the user?&quot;
          </p>
          <p>
            I care about building practical systems that solve the actual
            problem without adding unnecessary complexity.
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
              <li key={i} className="flex gap-3 text-sm">
                <span className="font-mono text-ok">✓</span>
                <div>
                  <p className="font-mono text-text">{v.title}</p>
                  <p className="mt-0.5 text-muted">{v.text}</p>
                </div>
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
