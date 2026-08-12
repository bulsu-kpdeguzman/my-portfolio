import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Stack",
};

const stack = [
  { group: "languages", items: ["Go", "TypeScript", "Python", "SQL"] },
  {
    group: "backend",
    items: ["Node.js", "NestJS", "FastAPI", "REST", "gRPC", "GraphQL"],
  },
  {
    group: "data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ClickHouse", "Kafka"],
  },
  {
    group: "infra",
    items: ["Docker", "AWS", "GCP", "Nginx", "CI/CD"],
  },
  {
    group: "auth & security",
    items: ["OAuth2", "OIDC", "JWT", "MFA", "WebAuthn"],
  },
  {
    group: "also good at",
    items: ["product flow", "business logic", "UX review", "API design"],
  },
];

export default function StackPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeader
        path="/stack"
        description="The tools I reach for, and the non-code skills that round them out."
      />

      <div className="space-y-6">
        {stack.map((group) => (
          <div
            key={group.group}
            className="rounded-md border border-line bg-surface px-5 py-4"
          >
            <p className="mb-3 font-mono text-xs text-faint">
              ~/.config/{group.group}
            </p>
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
