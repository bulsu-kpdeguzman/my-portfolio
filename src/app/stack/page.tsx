import SectionHeader from "@/components/SectionHeader";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Technology Stack",
  description:
    "Kenjie P. De Guzman's technology stack includes React, Next.js, Laravel, Django, Java, Python, MySQL, Supabase, Firebase, Docker, CI/CD, AI/LLM, and RAG.",
  path: "/stack",
  keywords: ["React", "Next.js", "Laravel", "Django", "Docker", "RAG"],
});

const stack = [
  {
    group: "languages",
    items: [
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL",
      "PHP",
      "C#",
      "HTML",
      "CSS",
      "Shell",
    ],
  },
  { group: "frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
  {
    group: "backend",
    items: ["Node.js", "Laravel", "Django", "REST APIs"],
  },
  {
    group: "data",
    items: ["MySQL", "PostgreSQL", "Supabase", "Prisma", "Firebase", "Neon"],
  },
  {
    group: "AI",
    items: ["AI / LLM", "Gemini", "RAG", "Isolation Forest"],
  },
  {
    group: "DevOps & infrastructure",
    items: ["Docker", "VPS", "CI/CD", "GitHub Actions", "Vercel", "Git"],
  },
  { group: "tools", items: ["Figma", "Postman"] },
  {
    group: "gov integrations",
    items: ["eGovSSO", "eMessage", "eGovAI", "Face Liveness"],
  },
  {
    group: "soft skills",
    items: ["business logic", "product flow", "UX review", "project management"],
  },
];

export default function StackPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/stack"
        title="Technology stack"
        description="The tools I reach for, and the non-code skills that round them out."
      />

      <div className="space-y-6">
        {stack.map((group) => (
          <div
            key={group.group}
            className="rounded-md border border-line bg-surface px-5 py-4"
          >
            <h2 className="mb-3 font-mono text-xs font-normal text-faint">
              ~/.config/{group.group}
            </h2>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded bg-bg px-2.5 py-1 font-mono text-sm text-text ring-1 ring-inset ring-line"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
